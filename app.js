const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30
  },
  http: {
    port: 9001,
    mediaroot: './media',
    allow_origin: '*'
  },
  trans: { // 这里参数是trans参数，不是relay参数，relay参数中配置hls无效
    ffmpeg: './ffmpeg.exe',//指明FFmpeg位置
    tasks: [
        {
            app: 'live',
            ac: 'acc',
            vc: 'libx264',
            hls: true,
            hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
            dash: true,
            dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
        }
    ]
  }
};

var nms = new NodeMediaServer(config)
nms.run();