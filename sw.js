/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "about/index.html",
    "revision": "930bbbf9f06efc4a58b30f52a597fd20"
  },
  {
    "url": "css/additional.css",
    "revision": "1064fe66d2cafea80480420151a830ef"
  },
  {
    "url": "css/farese.css",
    "revision": "24a1f4f309b2dc96cd6781b81f6edb50"
  },
  {
    "url": "img/icons/android-chrome-144x144.png",
    "revision": "3615a793c635123d794f9f67bc365ecb"
  },
  {
    "url": "img/icons/android-chrome-192x192.png",
    "revision": "37b76133bb922951dcc22ea5a3c8a4e1"
  },
  {
    "url": "img/icons/android-chrome-48x48.png",
    "revision": "343f9f91290df10b0a0acbd72d0f04f2"
  },
  {
    "url": "img/icons/android-chrome-72x72.png",
    "revision": "6d55872d88d23302cf454331640f188a"
  },
  {
    "url": "img/icons/android-chrome-96x96.png",
    "revision": "e4e51752f105185172ba0533768c338d"
  },
  {
    "url": "img/JohnnyFarese.png",
    "revision": "99cbb2ece5ec6eb3507cdf5e79b24a44"
  },
  {
    "url": "img/map-preview-old.png",
    "revision": "a52d2c60ccf5e5c7f331e41075ea483b"
  },
  {
    "url": "img/map-preview.png",
    "revision": "46c3521a8b26e063a39fa8db774918a7"
  },
  {
    "url": "img/marker.png",
    "revision": "3f6dd5b6d87e05f05824b907ab3013ed"
  },
  {
    "url": "index.html",
    "revision": "13bc3eec70fd0f9ea923a8074aae1eb3"
  },
  {
    "url": "legacy/about.htm",
    "revision": "98a00a964d251d9eac7a9fbd7f7495ba"
  },
  {
    "url": "legacy/articles.htm",
    "revision": "1331b8b9da23cec43d50d521f3727cbf"
  },
  {
    "url": "legacy/assets/amazon.gif",
    "revision": "aa9f58bec5b6b7c7bcedaf416a06d478"
  },
  {
    "url": "legacy/assets/amazon1.jpg",
    "revision": "0a261883186d7476565bd5d4fd85939e"
  },
  {
    "url": "legacy/assets/backgrey.gif",
    "revision": "c13ec36907b99e8e82d37143ecc249c3"
  },
  {
    "url": "legacy/assets/blackbar.jpg",
    "revision": "2b926f326644a7332c159bb5927a576a"
  },
  {
    "url": "legacy/assets/blueback.jpg",
    "revision": "cad98a390b8551d7cb7f98b2dcfc3a3c"
  },
  {
    "url": "legacy/assets/bosox.gif",
    "revision": "6f6c057ab899de580b45af06aa8a093f"
  },
  {
    "url": "legacy/assets/bruins.gif",
    "revision": "2dffd42036373040de2536724457726b"
  },
  {
    "url": "legacy/assets/celts.gif",
    "revision": "e4b5f0f17a52764ab617b3b63e7885ba"
  },
  {
    "url": "legacy/assets/cgh.gif",
    "revision": "1c89cf431f844cafce7603dc87600c59"
  },
  {
    "url": "legacy/assets/cotton.jpg",
    "revision": "9a49a09991d1b0e77276d4c52d733d9f"
  },
  {
    "url": "legacy/assets/crmvideo.jpg",
    "revision": "c709328485330a23d1542e0505edda6e"
  },
  {
    "url": "legacy/assets/david_l.gif",
    "revision": "3b81341e1d75388e4bd25fdc6f2bb74f"
  },
  {
    "url": "legacy/assets/dunn.jpg",
    "revision": "e88be1bfe3b63863f2d061495e56c67a"
  },
  {
    "url": "legacy/assets/ebc.jpg",
    "revision": "ccb74af02ab3c75d1d87cd62f13570d4"
  },
  {
    "url": "legacy/assets/email.gif",
    "revision": "75b8d056abace7360b4997068d38e2ae"
  },
  {
    "url": "legacy/assets/estrings.jpg",
    "revision": "9fc02d2fe4410678ec685e5c9b7291f9"
  },
  {
    "url": "legacy/assets/facebook.jpg",
    "revision": "aba9fc9b99a7f8680b6578f108ab89b9"
  },
  {
    "url": "legacy/assets/hopenat.jpg",
    "revision": "d3f6ab130a6b10b4adf7f72b7a248bf1"
  },
  {
    "url": "legacy/assets/iron.jpg",
    "revision": "4ed04350d939753ea7ab0ceb32183cbb"
  },
  {
    "url": "legacy/assets/iron2.jpg",
    "revision": "d4b3103cf6090c59b6bf977beec2ee7b"
  },
  {
    "url": "legacy/assets/jb_book1.gif",
    "revision": "738b3ee7e9be02f26ebf8a5951bd7cc3"
  },
  {
    "url": "legacy/assets/jf01.jpg",
    "revision": "d97bc068bd7786cdae44627d54f542aa"
  },
  {
    "url": "legacy/assets/jf02.jpg",
    "revision": "cbafde9356ea9c34046a734f2eacee21"
  },
  {
    "url": "legacy/assets/jf03.jpg",
    "revision": "945d077a36c73ee74dae57fc06e131d5"
  },
  {
    "url": "legacy/assets/jf04.jpg",
    "revision": "f5aff45b73e2c6c81a4dbbb98330d9a4"
  },
  {
    "url": "legacy/assets/jf05.jpg",
    "revision": "549fc47ade9ea1fad902b452a93a5a63"
  },
  {
    "url": "legacy/assets/jf06.jpg",
    "revision": "491877d366f8328f5dc4bfa189c39650"
  },
  {
    "url": "legacy/assets/jf07.jpg",
    "revision": "62d0cef78d5253113bd0b2fd30cc5012"
  },
  {
    "url": "legacy/assets/jf08.jpg",
    "revision": "88ca69c3b64f1b784b4ab1706a20b172"
  },
  {
    "url": "legacy/assets/jf09.jpg",
    "revision": "6adaf1ee8e3380dd893656de37a94468"
  },
  {
    "url": "legacy/assets/jf10.jpg",
    "revision": "7658a7de7e8fcabcbb7c74114ea12e9b"
  },
  {
    "url": "legacy/assets/jf11.jpg",
    "revision": "8a85f8997f5c59acf87ca2f42b71d84e"
  },
  {
    "url": "legacy/assets/jf12.jpg",
    "revision": "1a5e58519cf501c3a3ba249c08a369d9"
  },
  {
    "url": "legacy/assets/jf13.jpg",
    "revision": "5c80702b66eba99f550e9bc096cc829d"
  },
  {
    "url": "legacy/assets/jf14.jpg",
    "revision": "7f9cdd5be7091a1f390493e6d5df7d32"
  },
  {
    "url": "legacy/assets/jf15.jpg",
    "revision": "c86ccb1b3829e273aa7c7e26281a4f77"
  },
  {
    "url": "legacy/assets/jf16.jpg",
    "revision": "fe9b6e2a2c4d557da08ed57d2599743b"
  },
  {
    "url": "legacy/assets/jf17.jpg",
    "revision": "170e44ea87015f7836feb5df15900c85"
  },
  {
    "url": "legacy/assets/jf18.jpg",
    "revision": "4b41026653ea63f4910cffaf4ffc7ddd"
  },
  {
    "url": "legacy/assets/jf19.jpg",
    "revision": "994332762662e200a8f8a73d52e0e131"
  },
  {
    "url": "legacy/assets/jf20.jpg",
    "revision": "d6cf48032c8f352eb245ec8b2b216186"
  },
  {
    "url": "legacy/assets/jf21.jpg",
    "revision": "39048d08c2e2e5c07b571be61b4a4100"
  },
  {
    "url": "legacy/assets/jf22.jpg",
    "revision": "00400097b25e5f9d30aef516142d2aec"
  },
  {
    "url": "legacy/assets/jf23.jpg",
    "revision": "454fe19925b83b529519ffc7cc187a20"
  },
  {
    "url": "legacy/assets/jf24.jpg",
    "revision": "c4eb8347dc8288b20b828c8383d1a601"
  },
  {
    "url": "legacy/assets/jf25.jpg",
    "revision": "d7b71fb254973c88e6e7cd468bac17f4"
  },
  {
    "url": "legacy/assets/jf26.jpg",
    "revision": "a9bd71c82a8fb8166d52094d8bf7494e"
  },
  {
    "url": "legacy/assets/jf27.jpg",
    "revision": "6e8f88f2d5f859db860fa46b5de2c910"
  },
  {
    "url": "legacy/assets/jf28.jpg",
    "revision": "35c81c7464e6c94535197d51d5cb16e9"
  },
  {
    "url": "legacy/assets/jf29.jpg",
    "revision": "0203f9741d6cd8a2563aff03de1eae9b"
  },
  {
    "url": "legacy/assets/jf30.jpg",
    "revision": "1547a0a331f0bc8bef6d462218a83171"
  },
  {
    "url": "legacy/assets/jf31.jpg",
    "revision": "9ade9db47d82c4697cb6673272fd9ce8"
  },
  {
    "url": "legacy/assets/jf32.jpg",
    "revision": "f93ca4036a75808def7acedbf7d68200"
  },
  {
    "url": "legacy/assets/jf33.jpg",
    "revision": "138fd9670bc13578994defaf9b4e2f0c"
  },
  {
    "url": "legacy/assets/jf34.jpg",
    "revision": "790984358757fbcc19dc9dbe5705e30c"
  },
  {
    "url": "legacy/assets/jf35.jpg",
    "revision": "93cdfe176599595f2439847fbf0964a4"
  },
  {
    "url": "legacy/assets/jf36.jpg",
    "revision": "e85be73fe9765455389feaafad65e656"
  },
  {
    "url": "legacy/assets/jf37.jpg",
    "revision": "4b608e03433494efc40456246602041f"
  },
  {
    "url": "legacy/assets/jf38.jpg",
    "revision": "0c8c89d049969125f10eaf65fc3064f3"
  },
  {
    "url": "legacy/assets/jf39.jpg",
    "revision": "bdf2e09ced745ead2211e07c917c8cd3"
  },
  {
    "url": "legacy/assets/jf40.jpg",
    "revision": "27bd91bcc2966f405d3b2ca1e98abbb4"
  },
  {
    "url": "legacy/assets/jf41.jpg",
    "revision": "e1420e8a50447286e1a7760a78048af5"
  },
  {
    "url": "legacy/assets/jf42.jpg",
    "revision": "ac489500d065cda43a160b61cb510ccb"
  },
  {
    "url": "legacy/assets/jfbooks.jpg",
    "revision": "7456dc504841ab5f3010a8f2ed407d98"
  },
  {
    "url": "legacy/assets/jfkid.jpg",
    "revision": "9307bf184dcefb51e35b661226484591"
  },
  {
    "url": "legacy/assets/johnf.jpg",
    "revision": "39f4d7d5c7f02c60f8f6f168a246370c"
  },
  {
    "url": "legacy/assets/joni.gif",
    "revision": "62910defc505732ea37185d200988280"
  },
  {
    "url": "legacy/assets/joni2.jpg",
    "revision": "559e62f367575be4d6d6d96d79820c6e"
  },
  {
    "url": "legacy/assets/judyr.jpg",
    "revision": "8630eaa146912db7fe643438d8fd9fc0"
  },
  {
    "url": "legacy/assets/kfgr_fm.gif",
    "revision": "0111f7592c0f66143d142d0c8ec9c247"
  },
  {
    "url": "legacy/assets/line.jpg",
    "revision": "72a8359e03dd21518cea1a976af928d6"
  },
  {
    "url": "legacy/assets/logo.jpg",
    "revision": "40c364ed7fc68ada9675cddb567f06eb"
  },
  {
    "url": "legacy/assets/martin.jpg",
    "revision": "5e268543361cef19f5700b7b8f572f4e"
  },
  {
    "url": "legacy/assets/nepats.gif",
    "revision": "82cc79d94a4387f8d76c11426fb3801f"
  },
  {
    "url": "legacy/assets/parent.jpg",
    "revision": "3c9223e0856299b1e49c0aa3544b38cb"
  },
  {
    "url": "legacy/assets/payne.jpg",
    "revision": "af4a117dcd4647eefe4b9392a57dcc2a"
  },
  {
    "url": "legacy/assets/pc.jpg",
    "revision": "78f7062e2feb924d41de1c3860a5f097"
  },
  {
    "url": "legacy/assets/rbcd.jpg",
    "revision": "6d48732384dafce8ee2ac2c399343f81"
  },
  {
    "url": "legacy/assets/redbar.jpg",
    "revision": "c53213482d3b1ce55644a52c4f8acfcd"
  },
  {
    "url": "legacy/assets/rmp.jpg",
    "revision": "65425b55559ab28c73ebf0ca4df764eb"
  },
  {
    "url": "legacy/assets/ruth.jpg",
    "revision": "15adfb752c72e4d6f98336ec96260d95"
  },
  {
    "url": "legacy/assets/ryle.jpg",
    "revision": "26b52de10c74ce81729f7955f3e780a0"
  },
  {
    "url": "legacy/assets/s_audio.jpg",
    "revision": "7586f5be7bf279872b3045af02a632a8"
  },
  {
    "url": "legacy/assets/sgreen.jpg",
    "revision": "a70f1934f0cc8f1020df1a0bb4e994ce"
  },
  {
    "url": "legacy/assets/sgreen2.jpg",
    "revision": "c80c9457e55d63b0f1fb5b72b1dc92ed"
  },
  {
    "url": "legacy/assets/sma1.jpg",
    "revision": "e377faa736d6d1c56c74597e9b6b45d7"
  },
  {
    "url": "legacy/assets/sma2.jpg",
    "revision": "cda61ce25340cd88fb0b067512a27d6d"
  },
  {
    "url": "legacy/assets/twitter.jpg",
    "revision": "670890daf8e4db56ced27ea872771abf"
  },
  {
    "url": "legacy/assets/video1.jpg",
    "revision": "ebfa07d9ef8c356b9c62691dccf9d1c1"
  },
  {
    "url": "legacy/assets/video2.jpg",
    "revision": "1e19fcc4c088d30a057259b82b4880f9"
  },
  {
    "url": "legacy/assets/video4.jpg",
    "revision": "eb33eacdcab3ff4d605b152513e61b6a"
  },
  {
    "url": "legacy/assets/writing.jpg",
    "revision": "cc601c8c7066ac68b059e3c5821654a5"
  },
  {
    "url": "legacy/cotton.htm",
    "revision": "c0a66434d88a0fffa8c503938701192d"
  },
  {
    "url": "legacy/design.htm",
    "revision": "e4b0414b64503658339c0005e8c9f7c2"
  },
  {
    "url": "legacy/erkel.htm",
    "revision": "cc601aa765669aa311c7dc8fd7f3665f"
  },
  {
    "url": "legacy/holmes.htm",
    "revision": "8711f9b0f9ba1bd57f3b2ff4750d2ec2"
  },
  {
    "url": "legacy/hoyt.htm",
    "revision": "2eda60ea6dfc5b3189d65792d8cfc025"
  },
  {
    "url": "legacy/index.html",
    "revision": "6691292ef507625ce15b1f8a3a0c182f"
  },
  {
    "url": "legacy/kids.htm",
    "revision": "e6a382bbfd49f148d1f70a757fb8867f"
  },
  {
    "url": "legacy/links.htm",
    "revision": "63f6064ae1b6551326d2236a7f365ae3"
  },
  {
    "url": "legacy/map/contact/index.html",
    "revision": "b3ffbd1a67088fe756fade7658cd7a3b"
  },
  {
    "url": "legacy/map/css/additional.css",
    "revision": "dbee27ebd2f7e59f56d85920db97d756"
  },
  {
    "url": "legacy/map/css/tabs-to-dropdown.css",
    "revision": "97f073d49c18e8e6dd27833042ddcd6e"
  },
  {
    "url": "legacy/map/data.json",
    "revision": "2db0c05fd9944a720158c484d6584738"
  },
  {
    "url": "legacy/map/directory/index.html",
    "revision": "08db1e1d34c0af40827ac7c382f1e831"
  },
  {
    "url": "legacy/map/email.gif",
    "revision": "75b8d056abace7360b4997068d38e2ae"
  },
  {
    "url": "legacy/map/index.html",
    "revision": "23cc9b0aae5e5a5536594f088f2cd0b5"
  },
  {
    "url": "legacy/map/tabs-to-dropdown.js",
    "revision": "46dd5d8754e2a8d717ed1449756c5a20"
  },
  {
    "url": "legacy/music.htm",
    "revision": "c372aa0fb22a7b1ff8a4f2689b416f95"
  },
  {
    "url": "legacy/personal.htm",
    "revision": "ecec607659dfcd848c7caac96dd6a17d"
  },
  {
    "url": "legacy/photos.htm",
    "revision": "318c408aa2cc650ca598cf292d76c32f"
  },
  {
    "url": "legacy/rbcd/about.gif",
    "revision": "83693fbfcdd96684666af6d49a751a39"
  },
  {
    "url": "legacy/rbcd/about.htm",
    "revision": "06edd2c082424998f171b4d118d4d683"
  },
  {
    "url": "legacy/rbcd/al.htm",
    "revision": "f180aa8bd88e6781754f26208a021019"
  },
  {
    "url": "legacy/rbcd/amazon.jpg",
    "revision": "df82337b38af87e956da5783fde44a4e"
  },
  {
    "url": "legacy/rbcd/ar.htm",
    "revision": "b19371a3971aaa6c37c5dfbc3c1cd73c"
  },
  {
    "url": "legacy/rbcd/aus.htm",
    "revision": "ff7ab85f97ed2ebf6e6ff334f770482d"
  },
  {
    "url": "legacy/rbcd/az.htm",
    "revision": "36f1ea99fca39086103c524a0e1ba7b7"
  },
  {
    "url": "legacy/rbcd/barbados.htm",
    "revision": "73a44138d1b69784494290c831c164c9"
  },
  {
    "url": "legacy/rbcd/bottom.jpg",
    "revision": "3c7374d5e82af138fe3e85fd4d24c176"
  },
  {
    "url": "legacy/rbcd/brazil.htm",
    "revision": "dadba8e44c045efcec3c6ceb7f7c481a"
  },
  {
    "url": "legacy/rbcd/ca.htm",
    "revision": "be4fddef1b27bfc7948be6844edeb063"
  },
  {
    "url": "legacy/rbcd/cambodia.htm",
    "revision": "2bd6a12aeeda45ab05a6e225b12fe179"
  },
  {
    "url": "legacy/rbcd/can.htm",
    "revision": "aae5d6ad8a2e4dcdf0c78a2753105e77"
  },
  {
    "url": "legacy/rbcd/cen_am.htm",
    "revision": "c447e55f99f10d39220684fe233bb292"
  },
  {
    "url": "legacy/rbcd/co.htm",
    "revision": "ab5aec645134365ebd675bf783368c67"
  },
  {
    "url": "legacy/rbcd/colombia.htm",
    "revision": "d828ca13e15aef20e80ae4aa78b5e1e9"
  },
  {
    "url": "legacy/rbcd/cr.htm",
    "revision": "2c5c880a97aab8590ab8b49c2a599eb8"
  },
  {
    "url": "legacy/rbcd/ct.htm",
    "revision": "d6559c5edd24001bf0021487bddcc18e"
  },
  {
    "url": "legacy/rbcd/denmark.htm",
    "revision": "8100530071edf963f22c713baa66e71b"
  },
  {
    "url": "legacy/rbcd/dr.htm",
    "revision": "4b8cf34de4366bce10f6fc454d1d1039"
  },
  {
    "url": "legacy/rbcd/email.gif",
    "revision": "75b8d056abace7360b4997068d38e2ae"
  },
  {
    "url": "legacy/rbcd/facebook.jpg",
    "revision": "f2c0384826180604cd7dd5a69cdbf684"
  },
  {
    "url": "legacy/rbcd/farese.gif",
    "revision": "e270600fb3c3038c1285e74808fc67e9"
  },
  {
    "url": "legacy/rbcd/finland.htm",
    "revision": "6d8a4112088eb9c70ada39b70cf840e3"
  },
  {
    "url": "legacy/rbcd/fl.htm",
    "revision": "d227ce6ed33e544bcba79a035f059d24"
  },
  {
    "url": "legacy/rbcd/flag.gif",
    "revision": "cd5ff24c887da5b33f24b5894b8fd610"
  },
  {
    "url": "legacy/rbcd/foreign.gif",
    "revision": "d448051daa98bbbb6219823c0785b745"
  },
  {
    "url": "legacy/rbcd/foreign.htm",
    "revision": "86fef181b0691599681b98d4eef40f34"
  },
  {
    "url": "legacy/rbcd/fp1.jpg",
    "revision": "3f16e359808488f50380eee5acf5e41f"
  },
  {
    "url": "legacy/rbcd/fp2.jpg",
    "revision": "d9a89d0c94068f1cb736c25b441a1551"
  },
  {
    "url": "legacy/rbcd/fp3.jpg",
    "revision": "58151df88a5753543355e4bb5677067e"
  },
  {
    "url": "legacy/rbcd/fp4.jpg",
    "revision": "de50fc8eff0dcca273a6f9cd946b380a"
  },
  {
    "url": "legacy/rbcd/fra.htm",
    "revision": "2190eff91d128e27b4071b56c5f56976"
  },
  {
    "url": "legacy/rbcd/ga.htm",
    "revision": "589a0cd29c8178b9be8c02bc5e931b50"
  },
  {
    "url": "legacy/rbcd/germ.htm",
    "revision": "500378b1f252f58e527fdb55b572fae4"
  },
  {
    "url": "legacy/rbcd/google.jpg",
    "revision": "f4f48b2b4cf3f364583d0137d3813765"
  },
  {
    "url": "legacy/rbcd/grenada.htm",
    "revision": "dc3c52dec3d199da8a695675d1746f7b"
  },
  {
    "url": "legacy/rbcd/hi.htm",
    "revision": "c2460ddd7237555a2d2ed053c204e786"
  },
  {
    "url": "legacy/rbcd/hk.htm",
    "revision": "fd5bb457788616c4a1e33f80a2981595"
  },
  {
    "url": "legacy/rbcd/home.gif",
    "revision": "c0b4dbc658d3e399e2faf21d949e32fa"
  },
  {
    "url": "legacy/rbcd/hope.jpg",
    "revision": "c709328485330a23d1542e0505edda6e"
  },
  {
    "url": "legacy/rbcd/hopenat.jpg",
    "revision": "d3f6ab130a6b10b4adf7f72b7a248bf1"
  },
  {
    "url": "legacy/rbcd/ia.htm",
    "revision": "7e22dfd1fd3f106c0ff325b30cc78eb2"
  },
  {
    "url": "legacy/rbcd/id.htm",
    "revision": "6d8d08c40fd50d72029ee447b60de486"
  },
  {
    "url": "legacy/rbcd/il.htm",
    "revision": "98d4cdeb0efa2c2f0800506cf239f9d5"
  },
  {
    "url": "legacy/rbcd/in.htm",
    "revision": "0752f5e484a65c7c82f36209a3272707"
  },
  {
    "url": "legacy/rbcd/index.html",
    "revision": "ff624b4d69500635af755f4311412102"
  },
  {
    "url": "legacy/rbcd/india.htm",
    "revision": "0fc9436d53063f4dd805d5c4e7629425"
  },
  {
    "url": "legacy/rbcd/ireland.htm",
    "revision": "033af036a6f3896f2d1111c0534ef8b1"
  },
  {
    "url": "legacy/rbcd/isr.htm",
    "revision": "aae933efa08100f1f3f7cc64d2cfa410"
  },
  {
    "url": "legacy/rbcd/ita.htm",
    "revision": "01541230acf15efa77e80da3e9f9b17e"
  },
  {
    "url": "legacy/rbcd/jamaica.htm",
    "revision": "36510ae0df765b48f2e842627cd4e11b"
  },
  {
    "url": "legacy/rbcd/jfbook.jpg",
    "revision": "af64e6596bcdbe206aadce634262ca34"
  },
  {
    "url": "legacy/rbcd/ks.htm",
    "revision": "58ab75d9f474413e8b55bc509e806c9c"
  },
  {
    "url": "legacy/rbcd/ky.htm",
    "revision": "ca84eb27e438cb2285020cde5750fe46"
  },
  {
    "url": "legacy/rbcd/la.htm",
    "revision": "aa4f25cc0eee3d1e9da67dded31dbe81"
  },
  {
    "url": "legacy/rbcd/ma.htm",
    "revision": "946dcc2be754858541430e2e468fcc29"
  },
  {
    "url": "legacy/rbcd/malta.htm",
    "revision": "fc9e0c7ad737c08726bbf59740766297"
  },
  {
    "url": "legacy/rbcd/map.gif",
    "revision": "fd97802e4e53e1c7853bf03ddd6fc0ec"
  },
  {
    "url": "legacy/rbcd/map.jpg",
    "revision": "6dc79d832726b342a97c62290ffd739a"
  },
  {
    "url": "legacy/rbcd/may.htm",
    "revision": "5b5a2a3c77dc4ba72f402503c74c0ed0"
  },
  {
    "url": "legacy/rbcd/md.htm",
    "revision": "f9cd3e25046b599a9ace7379ba101aad"
  },
  {
    "url": "legacy/rbcd/me.htm",
    "revision": "8fda991c60d134fd2e1464244f8e59fc"
  },
  {
    "url": "legacy/rbcd/mex.htm",
    "revision": "8fc222cfdeed39d125d0686c4f41233f"
  },
  {
    "url": "legacy/rbcd/mi.htm",
    "revision": "12e58b5a23705ed4df6d25b25b6743ba"
  },
  {
    "url": "legacy/rbcd/mn.htm",
    "revision": "6bdbcf798d1157a7816708a6b40d965a"
  },
  {
    "url": "legacy/rbcd/mo.htm",
    "revision": "813c2b3a15040421a06bd2df8cb6f58e"
  },
  {
    "url": "legacy/rbcd/mont.htm",
    "revision": "50a82bea0febc51b8c321dcaf36f199c"
  },
  {
    "url": "legacy/rbcd/ms.htm",
    "revision": "3b9c86e84f7a4ef3adb00747402d1e3f"
  },
  {
    "url": "legacy/rbcd/mt.htm",
    "revision": "c1d000f82e274f32577dad4a7fad4c69"
  },
  {
    "url": "legacy/rbcd/mymar.htm",
    "revision": "ca9896137e7e035eb9899db50a91d762"
  },
  {
    "url": "legacy/rbcd/nc.htm",
    "revision": "f137218c56e3d80b12f9809091333e91"
  },
  {
    "url": "legacy/rbcd/nd.htm",
    "revision": "c7c19dc01ab9342e2505bdcd8c01a3b0"
  },
  {
    "url": "legacy/rbcd/ne.htm",
    "revision": "f80845eecea900b060809fd25ed5bcd8"
  },
  {
    "url": "legacy/rbcd/nh.htm",
    "revision": "dbca1527af8a30deef9a400fe3138214"
  },
  {
    "url": "legacy/rbcd/nic.htm",
    "revision": "b3ae46e60fb5cad7342df5c64a5b511f"
  },
  {
    "url": "legacy/rbcd/nj.htm",
    "revision": "cd6b91a9db89b7eea50c17ff125112c3"
  },
  {
    "url": "legacy/rbcd/nm.htm",
    "revision": "82a24c5b634c3644eace25569bf36eba"
  },
  {
    "url": "legacy/rbcd/nv.htm",
    "revision": "74070e1b24e2a58a22cfb641d6be849e"
  },
  {
    "url": "legacy/rbcd/ny.htm",
    "revision": "2f22369edbb951c24fa7ab6365680681"
  },
  {
    "url": "legacy/rbcd/nz.htm",
    "revision": "4ee2d0ab81f2b5a43b415bb89e421310"
  },
  {
    "url": "legacy/rbcd/oh.htm",
    "revision": "6c7c34d6694da2b3ee65f4ffac35fadb"
  },
  {
    "url": "legacy/rbcd/ok.htm",
    "revision": "5b805b0bbaa6a98815d45c29c4119146"
  },
  {
    "url": "legacy/rbcd/or.htm",
    "revision": "8b346ea152c3655f86c806724583efdc"
  },
  {
    "url": "legacy/rbcd/pa.htm",
    "revision": "f3e8b20c79f20c95af929b6df670d26f"
  },
  {
    "url": "legacy/rbcd/phi.htm",
    "revision": "29bca5ec0d343af570f0f7461521bbc4"
  },
  {
    "url": "legacy/rbcd/pr.htm",
    "revision": "f90788dad1f01878a61ebe379007d94a"
  },
  {
    "url": "legacy/rbcd/ri.htm",
    "revision": "7c9032c907969f576eaebd3ecc5af329"
  },
  {
    "url": "legacy/rbcd/s_audio.jpg",
    "revision": "7586f5be7bf279872b3045af02a632a8"
  },
  {
    "url": "legacy/rbcd/sc.htm",
    "revision": "0fa8da5c1bad547d18118f2aa5d00f8b"
  },
  {
    "url": "legacy/rbcd/sd.htm",
    "revision": "47f9ecceecd6f91726894f95fd911738"
  },
  {
    "url": "legacy/rbcd/shopping.gif",
    "revision": "733fcdf1275aea939f2cc7ed10e77f96"
  },
  {
    "url": "legacy/rbcd/sin.htm",
    "revision": "6183c9749e1744bb2e2a50c370d24e80"
  },
  {
    "url": "legacy/rbcd/slov.htm",
    "revision": "7080fe608c2c411ed684b69ffba35806"
  },
  {
    "url": "legacy/rbcd/sou.htm",
    "revision": "f71a3afde6c176e4cdbf202ea63650d4"
  },
  {
    "url": "legacy/rbcd/spain.htm",
    "revision": "6d90b74989a5a1fcce300d0b5e7e9823"
  },
  {
    "url": "legacy/rbcd/spurgeon.gif",
    "revision": "ab6cec21625f83a3e3a8d33fc9128184"
  },
  {
    "url": "legacy/rbcd/switz.htm",
    "revision": "c163d1ca8b95ebcc5074f4dd4efc8175"
  },
  {
    "url": "legacy/rbcd/title.jpg",
    "revision": "d868b2d2b61de31e0fb4451cb29c8267"
  },
  {
    "url": "legacy/rbcd/tn.htm",
    "revision": "37a4f1e249b88a2b45d1d37ac7b1219d"
  },
  {
    "url": "legacy/rbcd/trinidad.htm",
    "revision": "5cd255738972a8430e3e4552de03df26"
  },
  {
    "url": "legacy/rbcd/tur.htm",
    "revision": "d8dfba5c135356fd0f9ea2898a72b025"
  },
  {
    "url": "legacy/rbcd/tx.htm",
    "revision": "6d7c11505dab1b34043a2ab83c2968ab"
  },
  {
    "url": "legacy/rbcd/uk.htm",
    "revision": "ea608c21ba52ce5ec3f9967044a64e2f"
  },
  {
    "url": "legacy/rbcd/usa.gif",
    "revision": "52f4120c8a02f4f9d197e807010ff236"
  },
  {
    "url": "legacy/rbcd/usa.htm",
    "revision": "7fc327a2716b41e446c79e5520635981"
  },
  {
    "url": "legacy/rbcd/ut.htm",
    "revision": "168faab36dac285f09815cf59408bc22"
  },
  {
    "url": "legacy/rbcd/va.htm",
    "revision": "e045b14d3f6cb67bfde64b24c12200bf"
  },
  {
    "url": "legacy/rbcd/vt.htm",
    "revision": "6d486a9c790dc5f9febab22ee64d8370"
  },
  {
    "url": "legacy/rbcd/wa.htm",
    "revision": "b5dfc9ec2220fb9fcecb4237cc57de9b"
  },
  {
    "url": "legacy/rbcd/wes.htm",
    "revision": "4bed014a225218285f73659e1a1bb3eb"
  },
  {
    "url": "legacy/rbcd/wi.htm",
    "revision": "00a06b6c69e880aae904134344d6e954"
  },
  {
    "url": "legacy/rbcd/wv.htm",
    "revision": "7e78c771a72c1bfc4962d37f6a8d7f18"
  },
  {
    "url": "legacy/rbcd/wy.htm",
    "revision": "453aaec1d3c6b7e1eaa88148325fe579"
  },
  {
    "url": "legacy/rbcd/zam.htm",
    "revision": "1054f30ddf54cc22452fc5150a9550d2"
  },
  {
    "url": "legacy/reformed.htm",
    "revision": "f9e738885497d51a552d0e1a96c86ea9"
  },
  {
    "url": "legacy/regions.json",
    "revision": "aedb5a8f041a38fb307df835db896edb"
  },
  {
    "url": "legacy/ruth/1.htm",
    "revision": "356b064e9ffb972e36cf77d0aaaaad0a"
  },
  {
    "url": "legacy/ruth/10.htm",
    "revision": "e96fccb362cad4638aa6a37be6603539"
  },
  {
    "url": "legacy/ruth/100.htm",
    "revision": "997253d88f1fe835eb8700caf24df0e0"
  },
  {
    "url": "legacy/ruth/101.htm",
    "revision": "5d9c0516888715e82794eb7d56d41293"
  },
  {
    "url": "legacy/ruth/102.htm",
    "revision": "a23eba382c5a7dcbaccd47d4a38d4624"
  },
  {
    "url": "legacy/ruth/103.htm",
    "revision": "c58cce639f9fecf84017f2516b50805f"
  },
  {
    "url": "legacy/ruth/104.htm",
    "revision": "eb2a74569a8bb558320fa18cbca8c14b"
  },
  {
    "url": "legacy/ruth/105.htm",
    "revision": "9a7796ba2505e1662156d2403ca01197"
  },
  {
    "url": "legacy/ruth/106.htm",
    "revision": "a53fc30c0ac6c017a45c2f426b914d48"
  },
  {
    "url": "legacy/ruth/107.htm",
    "revision": "2fb8cbbb96fa276768a7411bc337d2e4"
  },
  {
    "url": "legacy/ruth/108.htm",
    "revision": "97b2245b0b1eefa1ba645761ff94cb92"
  },
  {
    "url": "legacy/ruth/109.htm",
    "revision": "861e1c522a7855166160ba148fb53703"
  },
  {
    "url": "legacy/ruth/11.htm",
    "revision": "fcfa7050484760c4a566c6af513b69a3"
  },
  {
    "url": "legacy/ruth/110.htm",
    "revision": "4a844b4054fd8bc349cb8ed3ffb99b24"
  },
  {
    "url": "legacy/ruth/111.htm",
    "revision": "aa5a741986c9ba6c179a0bb0de378b83"
  },
  {
    "url": "legacy/ruth/112.htm",
    "revision": "418c1cae1f27842397d4f2959ba01588"
  },
  {
    "url": "legacy/ruth/113.htm",
    "revision": "8fbcf10e45b60c237ccbe130784634af"
  },
  {
    "url": "legacy/ruth/114.htm",
    "revision": "1e14fbb6808bb34330765b7d8977753f"
  },
  {
    "url": "legacy/ruth/115.htm",
    "revision": "7979d48732629b06c28668e993e25e8d"
  },
  {
    "url": "legacy/ruth/116.htm",
    "revision": "aefdd34d67a4cc70c9b6f28034f13b3f"
  },
  {
    "url": "legacy/ruth/12.htm",
    "revision": "37e5ccbb4fb432496b92b4497a7f04bf"
  },
  {
    "url": "legacy/ruth/127.htm",
    "revision": "016c4253bd16e4221e0e5daf349ec51c"
  },
  {
    "url": "legacy/ruth/128.htm",
    "revision": "a656cec57b6983a0a7cafa7162bcfdee"
  },
  {
    "url": "legacy/ruth/13.htm",
    "revision": "a3735fae9858aff528e820a20e721f03"
  },
  {
    "url": "legacy/ruth/14.htm",
    "revision": "63d8e754f98ae7eb1e7939aff8bd9eb4"
  },
  {
    "url": "legacy/ruth/15.htm",
    "revision": "9f3fb2341c06e9fc21518c87e1a5d2c7"
  },
  {
    "url": "legacy/ruth/16.htm",
    "revision": "994f0a7c55ea2365fc9e480c4e3a3eb5"
  },
  {
    "url": "legacy/ruth/17.htm",
    "revision": "c7096c81d236602688eb0f108ceed5e7"
  },
  {
    "url": "legacy/ruth/18.htm",
    "revision": "6db143427e0afa04c56b6e6346c85947"
  },
  {
    "url": "legacy/ruth/19.htm",
    "revision": "ac450eecdcfadfc45fa29e6dd66e35d5"
  },
  {
    "url": "legacy/ruth/2.htm",
    "revision": "3d7bf6040a3cc4133c037bbaccb2d63d"
  },
  {
    "url": "legacy/ruth/20.htm",
    "revision": "289185d6f8f52f10d47afe9c7840b4c0"
  },
  {
    "url": "legacy/ruth/21.htm",
    "revision": "501bd7c1f6cd2148af34c7ccbac522f6"
  },
  {
    "url": "legacy/ruth/22.htm",
    "revision": "c92dbdf389348d6b9310b73074c7c651"
  },
  {
    "url": "legacy/ruth/23.htm",
    "revision": "d2e56fcf0d242b39b5af8987325df918"
  },
  {
    "url": "legacy/ruth/24.htm",
    "revision": "9c0a23687624412f1e7c791985d81178"
  },
  {
    "url": "legacy/ruth/25.htm",
    "revision": "29c64e7854452cd700184b51c8c024d1"
  },
  {
    "url": "legacy/ruth/26.htm",
    "revision": "37ed4b74133430c3a9245374d06b8ba4"
  },
  {
    "url": "legacy/ruth/27.htm",
    "revision": "d6c33082e3471f836d1c7e4367a64a41"
  },
  {
    "url": "legacy/ruth/28.htm",
    "revision": "efd959f14b8b8ef579853282491bc080"
  },
  {
    "url": "legacy/ruth/29.htm",
    "revision": "e465f67d90acaafc7e980ac5974e4d85"
  },
  {
    "url": "legacy/ruth/3.htm",
    "revision": "8e47c94612eff2e9ab685c2f3bd3b692"
  },
  {
    "url": "legacy/ruth/30.htm",
    "revision": "d58698c46f2642d3b0085c6c459a07c6"
  },
  {
    "url": "legacy/ruth/31.htm",
    "revision": "db91baec4d795dbf0157b1b66b520615"
  },
  {
    "url": "legacy/ruth/32.htm",
    "revision": "76c71284ebb1eeed67176fe7b76d1b64"
  },
  {
    "url": "legacy/ruth/33.htm",
    "revision": "9a418a71388a3bedcaf2a10df794b158"
  },
  {
    "url": "legacy/ruth/34.htm",
    "revision": "2e163256e8d8d754b09c411c97cecd75"
  },
  {
    "url": "legacy/ruth/35.htm",
    "revision": "d12d360039b3ef32e6ddf58ec3f95d47"
  },
  {
    "url": "legacy/ruth/36.htm",
    "revision": "f8e53077d8312852112e9a5af52cd287"
  },
  {
    "url": "legacy/ruth/37.htm",
    "revision": "fba0cb040572ec765afbebda101383ad"
  },
  {
    "url": "legacy/ruth/38.htm",
    "revision": "f33b21ed9e01a9027fd869189ed0124e"
  },
  {
    "url": "legacy/ruth/39.htm",
    "revision": "ad0ae660b4d95793015032f07c91a845"
  },
  {
    "url": "legacy/ruth/4.htm",
    "revision": "4ff0c53a5355c685b1214954c2b2cc42"
  },
  {
    "url": "legacy/ruth/40.htm",
    "revision": "e9e34f47b296c27835a2957a1464ab7b"
  },
  {
    "url": "legacy/ruth/41.htm",
    "revision": "99510887a3eab965eec0ad12a0758d65"
  },
  {
    "url": "legacy/ruth/42.htm",
    "revision": "049c4cba7bf146356e451ed47ab56c90"
  },
  {
    "url": "legacy/ruth/43.htm",
    "revision": "e8e426da843f932e6a5bc151781f39bf"
  },
  {
    "url": "legacy/ruth/44.htm",
    "revision": "5b968a486ba397b0fa946f6810bdadef"
  },
  {
    "url": "legacy/ruth/45.htm",
    "revision": "231a40b624b40bb0688a315dadd0f36d"
  },
  {
    "url": "legacy/ruth/46.htm",
    "revision": "1680c884868bf6506904f98e55b00d31"
  },
  {
    "url": "legacy/ruth/47.htm",
    "revision": "d7a043dc41e9dfab94543f1be256fcf2"
  },
  {
    "url": "legacy/ruth/48.htm",
    "revision": "258570e6130df5d9d435d35a1af84712"
  },
  {
    "url": "legacy/ruth/49.htm",
    "revision": "1d153514742ea5a6390b0ec437f8016c"
  },
  {
    "url": "legacy/ruth/5.htm",
    "revision": "f33f91a193db1852689784d1539043e3"
  },
  {
    "url": "legacy/ruth/50.htm",
    "revision": "b22d8d6cdc263d715efadbf78b1612b1"
  },
  {
    "url": "legacy/ruth/51.htm",
    "revision": "0e8bb50eb60e701105a002f639fefeeb"
  },
  {
    "url": "legacy/ruth/52.htm",
    "revision": "4b457baf6aaa67999020b573dccb427b"
  },
  {
    "url": "legacy/ruth/53.htm",
    "revision": "0cdd9b5824ab14048935bab7aa9b519e"
  },
  {
    "url": "legacy/ruth/54.htm",
    "revision": "b2fd94c2d45f55509b5e58fea2bf1089"
  },
  {
    "url": "legacy/ruth/55.htm",
    "revision": "fc61abac9a8ac5f028976ee184574247"
  },
  {
    "url": "legacy/ruth/56.htm",
    "revision": "a46fb5c80ba0cfb7d04ae323b4ae6db4"
  },
  {
    "url": "legacy/ruth/57.htm",
    "revision": "cc506ae5248d61bd5d9fa32bcec1571f"
  },
  {
    "url": "legacy/ruth/58.htm",
    "revision": "04f9a4e5b8f88a4c7287a2a089fdfae2"
  },
  {
    "url": "legacy/ruth/59.htm",
    "revision": "49da020b8323554de50031714a1df55f"
  },
  {
    "url": "legacy/ruth/6.htm",
    "revision": "60fbecd614a9eda9af2a6e364b40da4a"
  },
  {
    "url": "legacy/ruth/60.htm",
    "revision": "9941db458ba47ad92ba8adf029af6d4d"
  },
  {
    "url": "legacy/ruth/61.htm",
    "revision": "d6a8f39e1b8ad2a8d0160a526bcadd6e"
  },
  {
    "url": "legacy/ruth/62.htm",
    "revision": "51c12107db7dc7fc18b5d74c6ff0baa2"
  },
  {
    "url": "legacy/ruth/63.htm",
    "revision": "aff00c4348c7c11707007541890a3b81"
  },
  {
    "url": "legacy/ruth/64.htm",
    "revision": "929fb0c06a2388a57a666cb44c0c4a54"
  },
  {
    "url": "legacy/ruth/65.htm",
    "revision": "07f259db4bc671059ab9a718f09d31aa"
  },
  {
    "url": "legacy/ruth/66.htm",
    "revision": "c2948ef21788f31c2b322cc2dfa9ad1b"
  },
  {
    "url": "legacy/ruth/67.htm",
    "revision": "71347dbcc085ca2a0793adb3512d5185"
  },
  {
    "url": "legacy/ruth/68.htm",
    "revision": "4384050aa73ccb709f4cad34cfb1d634"
  },
  {
    "url": "legacy/ruth/69.htm",
    "revision": "ccff0205a98a7a10718ad0808f2eac44"
  },
  {
    "url": "legacy/ruth/7.htm",
    "revision": "865e17ccc386b74f1b09f37e29fe8f85"
  },
  {
    "url": "legacy/ruth/70.htm",
    "revision": "b076029f44e07581431586d1886b402e"
  },
  {
    "url": "legacy/ruth/71.htm",
    "revision": "fe2668eade7bca65491b6c7104facf97"
  },
  {
    "url": "legacy/ruth/72.htm",
    "revision": "f908921fda604096bcd5f6abd20d1986"
  },
  {
    "url": "legacy/ruth/73.htm",
    "revision": "841faafb5dc6a718456e705f3978d236"
  },
  {
    "url": "legacy/ruth/74.htm",
    "revision": "6891b9975ed407740118e2d8ff84ede6"
  },
  {
    "url": "legacy/ruth/75.htm",
    "revision": "436d78538bf2d339c05b48b22af056d2"
  },
  {
    "url": "legacy/ruth/76.htm",
    "revision": "c7946748891d5ca98c7380790eaac315"
  },
  {
    "url": "legacy/ruth/77.htm",
    "revision": "a33dd67e62571705b08b3d59317109b7"
  },
  {
    "url": "legacy/ruth/78.htm",
    "revision": "82f73d8a812f00d274f7c21110ebfcd4"
  },
  {
    "url": "legacy/ruth/79.htm",
    "revision": "7bacae34d0c06a32377b3e93451fbb20"
  },
  {
    "url": "legacy/ruth/8.htm",
    "revision": "324a8697846c12872d1827091435671f"
  },
  {
    "url": "legacy/ruth/80.htm",
    "revision": "184f608bc4c83ca35ee76dba9d99434a"
  },
  {
    "url": "legacy/ruth/81.htm",
    "revision": "70fd3f268dba7a6485d92e6981630712"
  },
  {
    "url": "legacy/ruth/82.htm",
    "revision": "857239badf4bcdf01db8ab7f02de805f"
  },
  {
    "url": "legacy/ruth/83.htm",
    "revision": "05eb397c0eed85a99d9bbb2aeb4e0757"
  },
  {
    "url": "legacy/ruth/84.htm",
    "revision": "f5cff7ac36ffff6cecf6b3a41de317e2"
  },
  {
    "url": "legacy/ruth/85.htm",
    "revision": "e4b8b7cae5589167130cd4ddc599c4d6"
  },
  {
    "url": "legacy/ruth/86.htm",
    "revision": "ad540a65e206d3cde343f0472a205444"
  },
  {
    "url": "legacy/ruth/87.htm",
    "revision": "0a1dc4ea91055f2612df13ae2e3f6f99"
  },
  {
    "url": "legacy/ruth/88.htm",
    "revision": "f90fbc96e14784f3112769915403cb09"
  },
  {
    "url": "legacy/ruth/89.htm",
    "revision": "32fb7fbecce1efa99a0b1731bb9e671f"
  },
  {
    "url": "legacy/ruth/9.htm",
    "revision": "d3bd579f4d0f2fe169c81495a621c312"
  },
  {
    "url": "legacy/ruth/90.htm",
    "revision": "3f87fc01f33385693777b2d970418785"
  },
  {
    "url": "legacy/ruth/91.htm",
    "revision": "aa5949f8e374f59c8373424ec4624705"
  },
  {
    "url": "legacy/ruth/92.htm",
    "revision": "f448615163a10a0c1eeffd9e394f3a0f"
  },
  {
    "url": "legacy/ruth/93.htm",
    "revision": "29166f138cd0996142c772df75d60688"
  },
  {
    "url": "legacy/ruth/94.htm",
    "revision": "b3c5af705ca7bc3fb7f5a8b560095d02"
  },
  {
    "url": "legacy/ruth/95.htm",
    "revision": "b49f31cc0bfb52688dc08911db63fbea"
  },
  {
    "url": "legacy/ruth/96.htm",
    "revision": "e1755fcc4d76da9c6a0e7417c4580b58"
  },
  {
    "url": "legacy/ruth/97.htm",
    "revision": "32da160d09d8577850b0a6039529982a"
  },
  {
    "url": "legacy/ruth/98.htm",
    "revision": "9a99c61f7d57ffbabed7e782592a2ed8"
  },
  {
    "url": "legacy/ruth/99.htm",
    "revision": "42297018d199f45283bc1bdd4ac94951"
  },
  {
    "url": "legacy/ruth/amzlogo.gif",
    "revision": "c5d10d173899d526cc0865b6ab9533ec"
  },
  {
    "url": "legacy/ruth/backgr.jpg",
    "revision": "4b53fb573acd83918546ac11bcc9671f"
  },
  {
    "url": "legacy/ruth/dove.gif",
    "revision": "c193f8681232119428c47cace0018dca"
  },
  {
    "url": "legacy/ruth/home.gif",
    "revision": "25750877d3ee0ddf66848226ce1e5b40"
  },
  {
    "url": "legacy/ruth/index.html",
    "revision": "e4c19098207addb085462bcf15307418"
  },
  {
    "url": "legacy/ruth/testmony.gif",
    "revision": "821a674356e357c26b65e3517be176fd"
  },
  {
    "url": "legacy/ruth/testmony.htm",
    "revision": "5180c12f358791c5f2f10c9397ac430e"
  },
  {
    "url": "legacy/ruth/title.gif",
    "revision": "773feeb0366e6c001895e87d20ceb386"
  },
  {
    "url": "legacy/ruth/toc.gif",
    "revision": "93e50e6501502c74bd5d32f186ab67bd"
  },
  {
    "url": "legacy/ruth/toc.htm",
    "revision": "cc308572e011d8c4cd5d9c774d8c9ae2"
  },
  {
    "url": "legacy/sermons.htm",
    "revision": "ce0289895bd011a6a1d2b778c138a433"
  },
  {
    "url": "legacy/sickness.htm",
    "revision": "376221d8fd518983774eb4a4251b4508"
  },
  {
    "url": "legacy/sma.htm",
    "revision": "5674d3c9dd8e6e125dfbb3642d81f409"
  },
  {
    "url": "legacy/sponsors.htm",
    "revision": "06330ba4fe12ab62fe27e02e614b9af7"
  },
  {
    "url": "legacy/support.htm",
    "revision": "ab56d4d49616c91b1c6273de81a4a3f3"
  },
  {
    "url": "legacy/text-dir-template.htm",
    "revision": "f580d875d3132ee63886dc4246e37981"
  },
  {
    "url": "legacy/tools.htm",
    "revision": "93809cc6cc8a047b88b9e729aeb6924c"
  },
  {
    "url": "legacy/trials.htm",
    "revision": "746c0741be83671c65a782d18fb8ff53"
  },
  {
    "url": "legacy/tsunami.htm",
    "revision": "5aba759332b8523e2a6a649a8d740bba"
  },
  {
    "url": "legacy/video1.htm",
    "revision": "f90d7e518606edde8a0cb260680099ed"
  },
  {
    "url": "legacy/video2.htm",
    "revision": "d9e6b3cdf573bdf7f4689e90208da517"
  },
  {
    "url": "legacy/video3.htm",
    "revision": "78c1cefbe143074710f08e45ad3a74c6"
  },
  {
    "url": "legacy/video4.htm",
    "revision": "0c2cd6bfda789196bb52ceb8eafd316f"
  },
  {
    "url": "legacy/videos.htm",
    "revision": "a289660869693ae7f452caa91e5b06b2"
  },
  {
    "url": "legacy/wibc.htm",
    "revision": "3e95fc1a38dcff49a6ee0cea8106c91a"
  },
  {
    "url": "legacy/wirbc.htm",
    "revision": "d6d34eae304d0da618321e8ed6913e7f"
  },
  {
    "url": "list/index.html",
    "revision": "8a7d7b5546b8867d8e5ced4124f89f81"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "3f0c50723f29a3c66b67d501898afa8b"
  },
  {
    "url": "map/data.json",
    "revision": "0c5eac5ab48bbb666942dc7a31f0e9d1"
  },
  {
    "url": "map/email.gif",
    "revision": "75b8d056abace7360b4997068d38e2ae"
  },
  {
    "url": "map/index.html",
    "revision": "db683f034c51622612b370437d62207e"
  },
  {
    "url": "workbox-config.js",
    "revision": "e22fb163672fbe26351f696479fbdc29"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
  /.*(?:api\.tiles|api|a\.tiles)\.mapbox\.com/,
  workbox.strategies.cacheFirst(),
);

workbox.routing.registerRoute(
  'https://cdn.google.com/example-script.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',
  'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js',
  workbox.strategies.staleWhileRevalidate(),
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

