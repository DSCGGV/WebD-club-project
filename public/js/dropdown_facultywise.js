

var course = {
    btech: ['Computer Science and Engineering' ,
            'Mechanical Engineering' ,
            'Civil Engineering' ,
            'Electronics and Communication Engineering',
            'Industrial and Production Engineering',
            'Chemical Engineering',
            'Information and Technology',
            ]
}

// getting course and dept values

var  main = document.getElementById('course');
var  sub = document.getElementById('department');

// trigger event when main menu change occurs
main.addEventListener('change',function(){
    // getting a selected option
    var selected_option = course[this.value];
    
    // removing sub menu options using while loop
    while(sub.options.length>0){
        sub.options.remove(0);
    }
})