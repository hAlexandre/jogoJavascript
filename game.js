var Game = {};

Game.fps = 50;
var maxObs = 1;
var perdeu = 0;
var width = 700;
var height = 600;
var t = 0;
var k = 0;
var carWidth = 60;
var carHeight = 80;
var busWidth = 60;
var busHeigth = 150;
var deslocamento = 21;
var pontos = 0;
var pontuacaoMax = 0;
var oilWidth = 40;
var oilHeight = 40;
var rockWidth = 30;
var rockHeight = 40;
var imgExplosion = new Image();
imgExplosion.src = "img/explosao.png";
var explosionWidth = 50;
var explosionHeight = 70;


Game.initialize = function() {
  t = 0;
  maxObs = 1;
  perdeu = 0;
  pontos = 0;
  this.velCenario = 1; 
  this.faixas = [-150, 0, 150, 300, 450, 600];  
  this.obstaculos = [];  
  this.coresCarro = ["img/roxo.png","img/vermelho.png", "img/laranja.png"];
  this.coresOnibus = ["img/onibusCinza.png", "img/onibusAzul.png", "img/onibusAzul2.png", "img/onibusVermelho.png"];
  this.context = document.getElementById("canvas").getContext("2d");
  this.largura_lateral = 80;
  this.cor_lateral = "#A0522D";
  //lateral esquerda
  this.context.fillStyle = this.cor_lateral;
  this.context.fillRect(0,120,this.largura_lateral,height);
  //lateral direita
  this.context.fillRect(width - this.largura_lateral, 0, width, height);
  this.context.fillStyle = "#000000"
  
  this.car_y = height - 100;
  this.car_x = 345;
  
  this.rockCondition = 0;  
  this.oilCondition = 0;


  
};


Game.carMove = function(tecla) {
  // 37 esquerda   39 direita  

  var teclaEsq = 37;
  var teclaDir = 39;
  if(this.oilCondition>=1)
  {
    teclaEsq = 39;    
    teclaDir = 37;
  }
  if(tecla==teclaEsq && perdeu==0)
  {
    if(this.car_x > this.largura_lateral + deslocamento)
      this.car_x -= deslocamento;
    else
      this.car_x = this.largura_lateral;
  } 
  else if (tecla==teclaDir && perdeu==0){
         if(this.car_x <= (width  - carWidth - deslocamento))
            this.car_x += deslocamento;
          else
            this.car_x = width - carWidth;
      }
   Game.draw();
  }



Game.draw = function() {
  if(perdeu==0)
  {
    //laterais
    this.context.fillStyle = "#545454";
    this.context.fillRect(this.largura_lateral, 0, width - this.largura_lateral, 600);  
    this.context.fillStyle = "#FFFF00";  
    
    //faixas
    for(var i = 0 ; i < this.faixas.length ; i++)   
      this.context.fillRect(365,parseInt(this.faixas[i]),16,100);       
    

    //obstaculos
    for(var i = 0; i < this.obstaculos.length ; i++)
    {
        if(this.obstaculos[i][0] == "car")        
        {              
          var img = new Image();
          img.src = this.obstaculos[i][3];                              
          this.context.drawImage(img, 0, 0, carWidth, carHeight, this.obstaculos[i][1], this.obstaculos[i][2], carWidth, carHeight);          
        }else if(this.obstaculos[i][0] == "bus")
        {
          var img = new Image();
          img.src = this.obstaculos[i][3];                              
          this.context.drawImage(img, 0, 0, busWidth , busHeigth, this.obstaculos[i][1], this.obstaculos[i][2], busWidth, busHeigth);                  
        }else if(this.obstaculos[i][0] == "oil")
        {          
          var img = new Image();          
          img.src = this.obstaculos[i][3];                                        
          
          this.context.drawImage(img, 0, 0, 2*oilWidth, 2*oilHeight, this.obstaculos[i][1] - oilWidth, this.obstaculos[i][2] - oilHeight, 2*oilWidth, 2*oilHeight);          
        }else if(this.obstaculos[i][0] == "rock")
        {          
          var img = new Image();
          img.src = this.obstaculos[i][3];
          this.context.drawImage(img, 0, 0, rockWidth, rockHeight, this.obstaculos[i][1], this.obstaculos[i][2], rockWidth, rockHeight);
        }
    }        

    if(this.oilCondition>=1 &&( this.oilCondition%35 <= 18))    
    {
      this.context.beginPath();
      this.context.lineWidth="7";
      this.context.strokeStyle="black";
      this.context.rect(this.largura_lateral+5,0,width - this.largura_lateral-10,height); 
      this.context.stroke();

    }
    }
    //Carro do jogador  
    var img1 = new Image();
    img1.src = "img/amarelo.png"
    if(this.rockCondition==0)
    {
      this.context.drawImage(img1, 0, 0, carWidth, carHeight, this.car_x, this.car_y, carWidth, carHeight);
    }
    else if(this.rockCondition % 14 <= 10) 
    {
      this.context.drawImage(img1, 0, 0, carWidth, carHeight, this.car_x, this.car_y, carWidth, carHeight);
    }
    if(perdeu==1)
      this.context.drawImage(imgExplosion,0,0,explosionWidth,explosionHeight, this.car_x, this.car_y, explosionWidth, explosionHeight);
    

    //Pontuação 
    this.context.fillStyle = this.cor_lateral;
    this.context.fillRect(0,0, this.largura_lateral, 150);
    this.context.fillStyle = "white";
    this.context.font = "bold 14px Arial";
    this.context.fillText(" Pontos ", 0, 20);
    this.context.fillText(pontos, 3, 50);
    this.context.fillText(" Maior ", 0, 80);
    this.context.fillText(" Pontuação  ", 0, 100);
    this.context.fillText(pontuacaoMax, 3, 120);
};


Game.loss = function()
{
  perdeu = 1;
  
  Game.draw();
  //Highscore e score
  this.context.fillStyle = "black";
  this.context.fillRect(250,170,250,250);
  this.context.fillStyle = "white";
  this.context.fillText("Sua pontuação  ", 252, 185);
  this.context.fillText(pontos, 252, 205);
  this.context.fillText("Maior pontuação  ", 252, 225);
  this.context.fillText(pontuacaoMax, 252, 245);
  
  this.context.beginPath();
  this.context.strokeStyle = "red";
  this.context.arc(375,335,73,0,2*Math.PI);
  this.context.stroke();
  this.context.fillStyle = "red";
  this.context.font = "bold 17px Arial";
  this.context.fillText("JOGAR", 345,325)
  this.context.fillText("NOVAMENTE", 325,345)
  
  if(pontos > pontuacaoMax)
    pontuacaoMax = pontos;
  pontos = 0;
};

Game.restart = function()
{
  if(perdeu==1)
  {
    Game.initialize();
  }
}

Game.verificaObstaculos = function(x, w)
{  

  var xMaior1,xMaior2,xMenor1,xMenor2;
  var aux;
  for(var i = 0 ; i < this.obstaculos.length ; i++)
  {
    if ( (w) >= (this.obstaculos[i][5]))
    {
      xMaior1 = x;
      xMaior2 = x+w;
      xMenor1 = this.obstaculos[i][1];
      xMenor2 = this.obstaculos[i][5] + this.obstaculos[i][1];      
    }else
    {
      xMaior1 = this.obstaculos[i][1];
      xMaior2 = this.obstaculos[i][5] + this.obstaculos[i][1];
      xMenor1 = x;
      xMenor2 = x+w;
    }    
    if(k==15)
      return 0;
    var aux = Math.floor((xMenor1 + xMenor2) / 2);
    if( ( (this.obstaculos[i][1] >= x ) && (this.obstaculos[i][1] <= (x+w)) )  || (x>=this.obstaculos[i][1] && x<= (this.obstaculos[i][1] + this.obstaculos[i][5]) ) || ((xMenor1 >= xMaior1) && (xMenor1 <= xMaior2) )  || (( xMenor2 >= xMaior1) && (xMenor2 <= xMaior2) ) || ( (aux >= xMaior1) && (aux <= xMaior2) ))
      return 1;

  }
    
  return 0;
}

Game.carObstacleInsert = function()
{
  var aux = (Math.floor(Math.random() * (this.coresCarro.length ) - 0.00001))
  var cor = this.coresCarro[aux];      
  var x = Math.random() * (width - 2 *this.largura_lateral) + this.largura_lateral ;     
  k = 0;
  while (Game.verificaObstaculos(x, carWidth))  {    
    x = Math.random() * (width - 2 *this.largura_lateral) + this.largura_lateral ; 
    k++;
    
  }
  if(k<15)
  {
    var vel = Math.floor( Math.random() * 6);
    var obs = ["car", x, -100 -  Math.floor(Math.random() * 100), cor,0,  carWidth, vel];      
    this.obstaculos.push(obs);    
  }
  
  
};

Game.busObstacleInsert = function()
{
  var aux = (Math.floor(Math.random() * (this.coresOnibus.length) - 0.00001))
  var cor = this.coresOnibus[aux];  
  var x = Math.random() * (width - 2 *this.largura_lateral) + this.largura_lateral ;
   k = 0;
  while (Game.verificaObstaculos(x, busWidth))  
    {
      x = Math.random() * (width - 2 *this.largura_lateral) + this.largura_lateral ;
      k++;
    }
  if(k<15)
  {
    var vel = Math.floor( Math.random() * 3);
    var obs = ["bus", x, -100 -  Math.floor(Math.random() * 100), cor,0, busWidth, vel + 0.5];
    this.obstaculos.push(obs);  
  }
  
};

Game.oilObstacleInsert = function()
{

  var x = Math.floor(Math.random() * (width - oilWidth -this.largura_lateral - oilWidth + 1)  + oilWidth + this.largura_lateral);
   k = 0;
  while (Game.verificaObstaculos(x - oilWidth, 2 * oilWidth))  
    {
      x = Math.floor(Math.random() * (width - oilWidth -this.largura_lateral - oilWidth + 1)  + oilWidth + this.largura_lateral);
      k++;
    }
  if(k<15)
  {    
    var obs = ["oil", x, -100 -  Math.floor(Math.random() * 100), "img/oil.png", 0, oilWidth * 2];    
    this.obstaculos.push(obs);
  }
  
}

Game.rockObstacleInsert = function()
{
  var x = Math.floor(Math.random() * (width - 2 *this.largura_lateral)  ) + this.largura_lateral;
   k = 0;
  while (Game.verificaObstaculos(x , rockWidth))  
  {
    x = Math.floor(Math.random() * (width - 2 *this.largura_lateral)  ) + this.largura_lateral;
    k++;
  }
  if(k<15)
  {
    var obs = ["rock", x, -100, "img/rock.png", 0, rockWidth];
    this.obstaculos.push(obs);  
  }
  
}

Game.verificaColisoes = function() {
  for(var i = 0 ; i < this.obstaculos.length ; i++)
    {
      var obs_x = this.obstaculos[i][1];
      var obs_y = this.obstaculos[i][2];      
      
      if(this.obstaculos[i][0] == "car")    
      {
        this.obstaculos[i][2] += this.velCenario + this.obstaculos[i][6];      
        if(   (Math.abs(this.car_x - obs_x) < (carWidth-2) ) && (Math.abs(this.car_y - obs_y) < carHeight-5))
        {          
          Game.loss();         
        }
        } else if(this.obstaculos[i][0] == "bus")    
          {
            this.obstaculos[i][2] += this.velCenario + this.obstaculos[i][6];            
            if(   (Math.abs(this.car_x - obs_x) < (busWidth-6) ) && (Math.abs(this.car_y - obs_y) < (busHeigth-12)))
            {                  
              if( (obs_y < (this.car_y -20)) || (Math.abs(this.car_y - obs_y) < (carHeight-5)))
              {
                 Game.loss();                 
              }               
            }
          } else if(this.obstaculos[i][0] == "oil")
            {
              this.obstaculos[i][2] += this.velCenario;      
              if(((this.car_x > (obs_x - oilWidth) )&& this.car_x < (obs_x + oilWidth)) || ( ((this.car_x + carWidth) > (obs_x - oilWidth)) && (this.car_x + carWidth)< (obs_x + oilWidth)))
              {
                if( (this.car_y > obs_y && this.car_y < (obs_y + oilHeight)) || ((this.car_y+carHeight) > obs_y && (this.car_y+carHeight) < (obs_y + oilHeight)))
                {                  
                    this.oilCondition = 1;
                    
                }
              }              
              
            }
              else if(this.obstaculos[i][0] == "rock")
              {
                this.obstaculos[i][2] += this.velCenario;              
                if ( (obs_x > this.car_x) && (obs_x < (this.car_x + carWidth)) ||  ((obs_x +rockWidth) > this.car_x) && ((obs_x+rockWidth) < (this.car_x + carWidth)) )
                {
                  if( (((obs_y + rockHeight) > this.car_y ) && ( ((obs_y + rockHeight) < this.car_y + carHeight) ) )  ||  ((((obs_y ) > this.car_y ) && ( (obs_y  < this.car_y + carHeight) ) ))    )
                  {
                    if(this.obstaculos[i][4] == 0)
                    {
                      this.obstaculos[i][4]++;
                      this.rockCondition = 1;
                      pontos = Math.floor(pontos * 0.75);
                      this.velCenario = Math.floor(this.velCenario * 0.6);
                      if(this.velCenario<1) this.velCenario = 1;                      
                      t
                    }

                  }
                }

              }
      


      if(obs_y > 600)
      {
        this.obstaculos.splice(i,1); 
        
        i--;
        if(i<0) i = 0;
      }
  } 
    
};

Game.update = function() {    
  if (perdeu == 0)
  {    
    t++;                    
    if(t%50 == 0) 
      pontos += 1;

    if(this.rockCondition>=1)
      this.rockCondition++;
    if(this.rockCondition==80)
      this.rockCondition = 0;

    if(this.oilCondition>=1)
      this.oilCondition++;
    if(this.oilCondition==200)
      this.oilCondition = 0;
    
    if(t%(130) == 0)
    {    
      for(var i = 0 ; i < maxObs ; i++)
      {
        var rand = (Math.random() * 100 );                    
        if(rand <= 20) Game.oilObstacleInsert();
        else if(rand <= 47) Game.busObstacleInsert();
        else if(rand<= 75) Game.carObstacleInsert();  
        else Game.rockObstacleInsert();
      }            
    }
    if((t%1000 == 0)  && (maxObs<=5))
        maxObs++;
    if( ((t%200) == 0) && (this.velCenario < 17))
    {    
      this.velCenario += 0.3;
    }else if(( t%500 == 0) && (this.velCenario < 21))
      {
        this.velCenario += 0.2;
      }


    Game.verificaColisoes();
    
    
    for(var i = 0 ; i < this.faixas.length ; i++)
    {
      this.faixas[i] += this.velCenario;
      if (this.faixas[i] >= 600)
        this.faixas[i] = this.faixas[i] - 750;      
    }    

  }
};










