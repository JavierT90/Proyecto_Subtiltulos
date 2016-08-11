
$(function() {
    var socket = io();



    $("#btnactualizar").click(function gen3d()
        {
            var k="Enviando desde javascript"
            socket.emit('gen3d',k);
            socket.emit('getcarga');
        });

    $("#btnpausa").click(function pausa()
            {
                var k=$("#pid").val();
                socket.emit('pausa',k);
            });
    $("#btnreanudar").click(function reanudar()
            {
                var k=$("#pid").val();
                socket.emit('reanudar',k);
            });
    $("#btnfinalizar").click(function finalizar()
            {
                var k=$("#pid").val();
                socket.emit('finalizar',k);
            });

    $("#btnlogin").click(function login()
            {
                var k=$("#user").val()+$("#pass").val();
                socket.emit('login',k);
            });

    socket.on('loginOK', function (data) {

                $("#user").prop('disabled', true);
                $("#pass").prop('disabled', true);

                $( "#procesos" ).slideDown( "slow", function() {});
                $( "#botones" ).slideDown( "slow", function() {});

            });
    socket.on('loginnot', function (data) {
                alert("Error inicio de sesion");
                $("#user").val('');
                $("#pass").val('');

            });


    socket.on('poner3d', function (data) {
        $("#info").html(data);
      });
      var total=100;
      var usada=50;
      var libre=20;
  socket.on('setmemoria', function (data) {
                total=data[0];
                usada=data[1];
                libre=data[1];
                var config = {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [
                        libre,
                        total-libre,

                    ],
                    backgroundColor: [
                        "#F7464A",
                        "#46BFBD",

                    ],
                }],
                labels: [
                    "Ram Utilizada",
                    "Ram Libre",
                    ]
            },
            options: {
                responsive: true
            }
        };

                  var ctx = document.getElementById("skills").getContext("2d");
                  window.myPie = new Chart(ctx, config);

              });
              socket.on('setmemoriaswap', function (data) {
                            total=data[0];
                            usada=data[1];
                            var config = {
                        type: 'doughnut',
                        data: {
                            datasets: [{
                                data: [
                                    total-usada,
                                    usada,

                                ],
                                backgroundColor: [
                                    "#F7464A",
                                    "#46BFBD",

                                ],
                            }],
                            labels: [
                                "Swap Utilizada",
                                "Swap Libre",
                                ]
                        },
                        options: {
                            responsive: true
                        }
                    };

                              var ctx = document.getElementById("Swap").getContext("2d");
                              window.myPie = new Chart(ctx, config);

                          });


    $(document).ready(
      function()
          {
            //$("#procesos").hide();

//socket.emit('getmemoria');

              socket.emit('gen3d');
              socket.emit('getcarga');
              socket.on('setcarga',function(data){
                var config = {
            type: 'line',
            data: {
                datasets: [{
                    data: [{x:0,y:data[2]},{x:5,y:data[1]},{x:15,y:data[0]}]
                          }],
                          labels: [
                              "Carga CPU",
                              "Tiempo"
                              ]

            },
            options: {

                scales:{
                  xAxes:[{type:'linear',position:'bottom'}]
                }

            }
        };

                  var ctx = document.getElementById("carga").getContext("2d");
                  window.myPie = new Chart(ctx, config);


              });

          }
        );


});
