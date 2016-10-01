function Position(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

function Box(x, y, z, color) {
    this.pos = new Position(x, y, z);
    this.color = color;
}

function Tree(x, y, z, stage) {
    this.pos = new Position(x,y,z);
    this.stage = stage;
    var gV = Math.floor(Math.random() * (200-100) + 100);
    var greenColors = [gV-20,gV+20,gV-10,gV-20,gV+30,gV-20];
    this.Draw = function() {
        if (stage >= 0) {
            move3d(x*10,y*10,z);
            fill('rgb(50,0,50)');
            box(30,30,50);
        }
        if (stage >= 1) {
            move3d(x*10,y*10,-100);
            fill('rgb(50,0,50)');
            box(30,30,50);
        }
        if (stage >= 2) {
            move3d(x*10,y*10,-125);
            fill('rgb(0,'+greenColors[0]+',0)');
            box(90, 90,50);
        }
        if (stage >= 3) {
           move3d(x*10,y*10,-175);
           fill('rgb(0,'+greenColors[1]+',0)');
           box(70, 70 ,50);
        }
        if (stage >= 4) {
           move3d(x*10,y*10,-225);
           fill('rgb(0,'+greenColors[2]+',0)');
           box(50, 50 ,50);
        }
        if (stage >= 5) {
           move3d(x*10,y*10,-275);
           fill('rgb(0,'+greenColors[3]+',0)');
           box(30, 30 ,50);
        }
        if (stage >= 6) {
           move3d(x*10,y*10,-300);
           fill('rgb(0,'+greenColors[4]+',0)');
           box(20, 20 ,25);
        }
        if (stage >= 7) {
           move3d(x*10,y*10,-310);
           fill('rgb(0,'+greenColors[5]+',0)');
           box(10, 10 ,10);
           move3d(x*10,y*10,-315);
           fill('rgb(0,'+greenColors[5]+',0)');
           box(5,5 ,5);
        }
    }
}

function mouseClicked() {
  console.log(mouseX + " " + mouseY);
}

var cp;
var boxes = new Array();
var trees = new Array();
function setup() {
    createCanvas(800, 600, WEBGL);
    ortho(-width/2, width/2, height/2, -height/2, 0.1, 100);
    for (var rows = 0;rows<10;rows++) {
        for (var cols = 0;cols<10;cols++) {
            var greenValue = Math.random() * (255 - 150) + 150;
            var b = new Box(10*rows, 10*cols, 0, 'rgb(0,'+Math.floor(greenValue)+',0)');
            boxes.push(b);
        }
    }

    for (var rows = 0;rows<10;rows++) {
        for (var cols = 0;cols<10;cols++) {
            var treeChance = Math.random() * 10;
            if (treeChance > 8) {
                var tree = new Tree(10*rows, 10*cols, -75, Math.floor(Math.random() * 8));
                trees.push(tree);
            }
        }
    }
    boxes[0].color = 'rgb(0,150,0)';
    console.log(trees);
    cp = new Position(0,0,0);
}



function move3d(x,y,z) {
    translate(-cp.x,-cp.y,-cp.z);
    translate(x,y,z);
    cp.x = x;
    cp.y = y;
    cp.z = z;
    //console.log(cp.x + " " + cp.y + " " + cp.z);
}

function draw() {
    background(255);
    pointLight(150, 100, 0, 500, 0, 200);

	// Blue directional light from the left
	directionalLight(0, 102, 255, -1, 0, 0);

	// Yellow spotlight from the front
	pointLight(255, 255, 109, 0, 0, 300);
    translate(0, -height/2);

    rotateX(mouseY/100);
    rotateZ(mouseX/100);

    for (var x=0;x<100;x++) {
        fill(boxes[x].color);
        move3d(boxes[x].pos.x * 10, boxes[x].pos.y * 10, 0);
        box(100,100,100);
    }

    for (var i=0;i<trees.length;i++) {
        trees[i].Draw();
    }

    var dirY = (mouseY / height - 0.5) * 4;
	var dirX = (mouseX / width - 0.5) * 4;
	directionalLight(204, 204, 204, dirX, dirY, 1);
}
