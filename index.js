import { NativeModules } from 'react-native';

const { AudioMetadata } = NativeModules;

export default class AudioMetadataLoader {
    load = (uri, resolver) => {
        console.log('aqui')
        AudioMetadata.load(uri, ".ogg", resolver);
    }
}
