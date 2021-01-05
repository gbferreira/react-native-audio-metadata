require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-audio-metadata"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  react-native-audio-metadata
                   DESC
  s.homepage     = "https://github.com/gbferreira/react-native-audio-metadata"
  s.license      = "MIT"
  s.authors      = { "Gabriel Ferreira" => "gabrielferreira@gmail.com" }
  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "https://github.com/gbferreira/react-native-audio-metadata.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,c,m,swift}"
  s.requires_arc = true

  s.dependency "React"
  # ...
  # s.dependency "..."
end

