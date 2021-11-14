const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

if(canvas.getContext){
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
