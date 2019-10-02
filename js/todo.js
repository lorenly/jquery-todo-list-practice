$(document)
    .ready(function () {

        function generateUUID() {
            /*jshint bitwise:false */
            var i,
                random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12
                    ? 4
                    : (i === 16
                        ? (random & 3 | 8)
                        : random)).toString(16);
            }
            return uuid;
        }
        
        // code to be implemented
        function addItem(){
            $("ol").append(`<li id=${generateUUID()} class="">
                <input name="done-todo" type="checkbox" class="done-todo"><span> ${getInput()} </span></li>`).click(function() {
            });
            $('ol li').dblclick(editList);
        };

        
        $("#button").click(addItem);
        $('input[name=ListItem]').keypress(function(e){
                if(e.which == 13){
                    e.preventDefault();
                    $("ol").append(`<li id="${generateUUID()}" class="">
                <input name="done-todo" type="checkbox" class="done-todo"><span> ${getInput()} </span></li>`);
                    $(this).val('');
                }
            $('ol li').dblclick(editList);
        });      


        function getInput(){
            return $("input[name=ListItem]").val();
        }

        $(document).on('change', 'input[name="done-todo"]', function() {
            $(this).closest("li").toggleClass('checked');// checkbox is checked
        });

        
        function filterList(){
            $('[data-filter="all"]', '[data-filter="active"]', '[data-filter="complete"]').removeClass();
            if ($(this).attr("data-filter") == "all") {
                $("ol li").show();
                $(this).addClass("selected");
            }

            if ($(this).attr("data-filter") == "active") {
                $("ol li").show();
                $("ol li.checked").hide();
                $(this).addClass("selected");
            } 

            if ($(this).attr("data-filter") == "complete") {
                $("ol li").show().hide();
                $('ol li.checked').show();
                $(this).addClass("selected");
            } 
        }

        $('[href="#"]').click(filterList);

        function editList(){
            $(this).attr('contentEditable', true).focus();
            
            $(this).keypress(function (event) {
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if(keycode == '13'){
                    $(this).blur().attr('contentEditable', false);
                }
            });
        }

        $('ol li').dblclick();
        
        $('input[name="ListItem"]').focus(function () {
            $(this).val('');
        });;
    });