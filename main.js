var s= new THREE.Scene()

var c = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000)
c.position.z=2
var r = new THREE.WebGLRenderer({antialias:true})

r.setClearColor("crimson")
r.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(r.domElement)

window.addEventListener("resize",()=>{
    r.setSize(window.innerWidth, window.innerHeight)
    c.aspect=window.innerWidth/window.innerHeight
    c.updateProjectionMatrix()
})

var raycaster = new THREE.Raycaster()
var mouse = new THREE.Vector2()

var geometry = new THREE.BoxGeometry(0.5,0.5,0.5)
var material = new THREE.MeshLambertMaterial({color:"green"})

var mesh = new THREE.Mesh(geometry, material)
mesh.position.set(-1,-0.5,-1)
mesh.scale.set(2,2,1)

var light= new THREE.PointLight("green", 1 , 501)
light.position.set(0,0,25)
s.add(light)


s.add(mesh)

var hmmm = function(){
    requestAnimationFrame(hmmm)
    r.render(s,c)
}
hmmm()



window.addEventListener("mousemove",(event)=>{
   event.preventDefault()
   mouse.x= (event.clientX/window.innerWidth)*2-1
   mouse.y= (event.clientY/window.innerHeight)*2-1


   raycaster.setFromCamera(mouse,c)

   var intersects = raycaster.intersectObjects(s.children, true)

   for(var i=0; i<intersects.length; i++){
       var light = new THREE.PointLight("red",1,200)
       light.position.set(25,25,25)
        s.add(light)
       intersects[i].object.material.color.set("#ff0000")

       var a = new TimelineMax()
a.to(intersects[i].object.scale, 1, {x:2})

a.to(intersects[i].object.scale, 1, {x:0.5})
a.to(intersects[i].object.position, 1, {x:2})
a.to(intersects[i].object.rotation, 1, {y:2})

   }
})
