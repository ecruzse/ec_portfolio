function ThemeChangerClass() {    
    
    this.darkButton = document.getElementById('dark');
    this.gradientButton = document.getElementById('gradient');
    this.lightButton = document.getElementById('light');
    this.cssVar = ''
    this.color = ''

    this.background = function background(dark,gradient,light){
        console.log(dark, gradient, light)
        let root = document.querySelector(':root');
        let rootstyles = getComputedStyle(root);
        if(dark == 'dark'){
            document.getElementById('htmlTag').setAttribute('data-bs-theme', 'dark')
            // root.style.setProperty(this.cssVar, this.color);
        }if(gradient == ''){
            document.getElementById('htmlTag').setAttribute('data-bs-theme', 'dark')
        }if(light == 'light'){
            document.getElementById('htmlTag').setAttribute('data-bs-theme', 'light')
            rgba(0, 255, 102, 0.193)
        };
    };
};
// create class to change bacground
const BaseThemeChanger = new ThemeChangerClass()