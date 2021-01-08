package br.com.audiometadata;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import android.media.MediaMetadataRetriever;
import android.net.Uri;
import android.os.Environment;
import android.os.Build;

import java.util.HashMap;
import java.lang.Exception;
import java.net.HttpURLConnection;
import java.net.URL;

import java.io.File;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.FileOutputStream;

public class AudioMetadataModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public AudioMetadataModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "AudioMetadata";
    }

    @ReactMethod
    public void load(String uri, String extension, 
     Callback callback) {
System.out.println("URLAQUI");
        // MediaMetadataRetriever mediaRetriever = new MediaMetadataRetriever();

        String url = download(uri, extension);
        System.out.println("URLC" + url);

        // if (Build.VERSION.SDK_INT >= 14) {
        //     mediaRetriever.setDataSource(url, new HashMap<String, String>());
        // } else {
        //     mediaRetriever.setDataSource(url);
        // }

        // String fileName = mediaRetriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ALBUM);
        // callback.invoke(fileName);
    }

    private String download(String fileURL, String ext) {
        String res = "";
        try {
                File rootDir = Environment.getExternalStorageDirectory();

                //connecting to url
                URL u = new URL(fileURL);

                HttpURLConnection c = (HttpURLConnection) u.openConnection();
                c.setRequestMethod("GET");
                c.setDoOutput(true);
                c.connect();
                 
                //lenghtOfFile is used for calculating download progress
                int lenghtOfFile = c.getContentLength();

                File newFile = new File(rootDir + "/temp_files/", "temp" + ext);
                
                //this is where the file will be seen after the download
                FileOutputStream f = new FileOutputStream(newFile);
                //file input is from the url
                InputStream in = c.getInputStream();
 
                //here’s the download code
                byte[] buffer = new byte[1024];
                int len1 = 0;
                long total = 0;
                 
                while ((len1 = in.read(buffer)) > 0) {
                    total += len1; //total = total + len1
                    f.write(buffer, 0, len1);
                }
                f.close();
                 
                 res = newFile.getAbsolutePath();

            } catch (Exception e) {
                System.out.println("CLASSAPPERROR" + e.getMessage());
            }

            return res;
    }
}
