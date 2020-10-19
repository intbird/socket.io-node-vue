ServiceLoader
========

This repo is for publish aar lib for  [intbird repo](http://intbird.net:8081/nexus/content/repositories/public/).

how about
![intbird](./images/intbird.png)

#### How to use it ?

--------
#### 1.add maven url in root project `build.gradle` file
```
allprojects {
    repositories {
        google()
        jcenter()
        maven { url "http://intbird.net:8081/nexus/content/repositories/public/" }
    }

    configurations.all {
        resolutionStrategy {
            // don't cache dynamic versions at all
            cacheDynamicVersionsFor 0, 'seconds'
            // don't cache changing modules at all
            cacheChangingModulesFor 0, 'seconds'
        }
    }
}
```

#### 2.add classpath in root project `build.gradle` file ,
$lastVersion = 1.0.0 [click here to see more info](CHANGELOG.md)

```
dependencies {
    implementation 'intbird.soft.lib:service-loader:1.0.0'
}
```


#### More about to do with android lib module

see: [https://github.com/intbird/VideoPlayerLib](https://github.com/intbird/VideoPlayerLib)

```
 var path = "$video path"
 ServicesLoader.load(IVideoPlayer::class.java)?.startActivity(this, arrayListOf(path,path,path), defaultStartIndex=0)
```
