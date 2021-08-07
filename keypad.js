
var button = document.querySelectorAll('button'),   //Select all button  from Document(HTML) in a variable button
    input = document.querySelector('input'),        //Select input section from Document(HTML) in a variable input
    
    engage = true,                                    // engage the process 
    hold,                                             // Hold the button
    is_engage,                                        //check engage or not
    delay = 1000,                                     //time set for hold
    change = -1,                                      //For changeing text
    click = null;                                     //Click on button check
    len = button.length                               // number of button

    for (var i = 0; i < len; ++i) {                                                                     //forloop use for Connecting all button
    button[i].onmousedown = function(e) {                                                               //onmousedown function use for every pass of mouse in element(button)
        var text = this.getAttribute('data-text').split(""),                                            //get Text data from each button from document file
            number = this.getAttribute('data-number');                                                  //get Number data from each button from document file  
        engage = true;                                                                                       
        clearTimeout(is_engage);                                                                                       
        if (click !== e.target) {                                                                       //if target text is not click                
            engage = false;                                                                               
        }
        if (change >= text.length - 1 || click !== e.target) {                                          //if click more then text present in button then start from beggining
            change = 0;                                                                                                     
            click = e.target;                                                                           // else keep changing                
        } else {
            change = change + 1;                                                                                    
        }
        if (text[0] === '|') {                                                                           //if text == |  (pipe) then erase one text                       
            input.value = input.value.slice(0, -1);                                                                                                             
            hold = setTimeout(function() {                                                               // if hold the button then clear input section       
                input.value = "";                                                                                                                                                           
            }, delay);                                                                                                                          
            return;                                                                                                        
        }
        hold = setTimeout(function() {                                                                  // hold is if long press on button it will return number            
            input.value = input.value.slice(0, -1) + number;                                                                        
        }, delay);
        input.value = engage ? input.value.slice(0, -1) + text[change] : input.value + text[change];    // if engage then continue change the text or return the text/number                                                        
    };
    button[i].onmouseup = function(e) {                                                                 // onmouseup funtion use release each time mouse click from element(button)                                     
        clearTimeout(hold);                                                                                                                         
        engage = true;                                                                                                                  
        is_engage = setTimeout(function() {                                                             // isengage check and reset variables memory                                           
            change = -1;                                                                                                                
            engage = false;                                                                                                     
            e.target = null;                                                                                                                        
        }, delay);                                                   
        input.focus();                                                                                  // put caret at the end of the input                                              
        input.selectionStart = input.selectionEnd = input.value.length;                                                                                                     
    };
}