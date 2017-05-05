var gulp = require('gulp'),
    jsonToSass = require('gulp-json-to-sass'),
    gulpSass  = require('gulp-sass'),
    partnername="Theme_Black",
    targetname="lp_theader",
    watch = require('gulp-watch'),
    assemblenamejson="json/component/"+targetname+".json",
    assemblenamescss="../Scss/"+partnername+"/Theme_Color_Setting/comp/"+targetname+".scss",
    assemblepartnerfolder="../Theme/"+partnername+"/Css/comp",
    tgScss="../Scss/Theme/"+partnername+"/Css/comp/*.scss",
    jf = require('jsonfile'),
    connection,
    fs = require('fs'),
    gulpCompass    = require('gulp-compass');


//引入http websocket
var http = require('http');
var ws = require('websocket').server;

// 建立server 並監聽Port 9999
var PORT = 9999;
var server = http.createServer().listen(PORT)


webSocketServer = new ws({
    httpServer: server
});


webSocketServer.on('request', function(request) {
    connection = request.accept('echo-protocol', request.origin);

   
    connection.on('message', function(message) {
        console.log(message);
        
        
        var recobj=JSON.parse(message.utf8Data);
        if(recobj.type=="request"){
          var getjsonpath="json/component/"+ recobj.compID+".json";
            partnername=recobj.themeID;
            targetname=recobj.compID;
            assemblenamejson="json/component/"+targetname+".json";
            assemblenamescss="../Scss/"+partnername+"/Theme_Color_Setting/comp/"+targetname+".scss",
            assemblepartnerfolder="../Theme/"+partnername+"/Css/comp",
            tgScss="../Scss/Theme/"+partnername+"/Css/comp/*.scss",
            jf.readFile(getjsonpath, function(err, obj) {
              console.log(obj);
              connection.send(JSON.stringify(obj));
            });
          
        }
        if(recobj.type=="update"){
          var getjsonpath="json/component/"+ recobj.compID+".json";
              partnername=recobj.themeID;
              targetname=recobj.compID;
              assemblenamejson="json/component/"+targetname+".json";
              assemblenamescss="../Scss/"+partnername+"/Theme_Color_Setting/comp/"+targetname+".scss",
              assemblepartnerfolder="../Theme/"+partnername+"/Css/comp",
              tgScss="../Scss/Theme/"+partnername+"/Css/comp/*.scss",
              fs.writeFile(getjsonpath, JSON.stringify(recobj.obj), function(err) {
                  if (err) 
                    throw 'error writing file: ' + err;
                  else
                    console.log('Write operation complete.');
                    gulp.run('sasss');
              });
 
          
        }
        
        
    });

    
    connection.on('close', function(reasonCode, description) {
        console.log('Close');
    });
});


gulp.task('watchjsonFolder', function () {
  gulp.watch('json/component/*.json', function() {
    gulp.run('sasss');
    console.log("123");
  });
  
})


gulp.task('sasss', function () {
  return gulp.src(tgScss)
      .pipe(jsonToSass({
          jsonPath: assemblenamejson,
          scssPath: assemblenamescss
      }))
      .pipe(gulpSass(),console.log("test"))
      .pipe(gulp.dest(assemblepartnerfolder));
});



gulp.task('default',['sasss','watchjsonFolder']);