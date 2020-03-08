class contact
{
    constructor(contactName="", emailAddress="", contactNumber="", contactMessage="")
    {
        this.contactName = contactName;
        this.emailAddress = emailAddress;
        this.contactNumber = contactNumber;
        this.contactMessage = contactMessage;
    }
}

class User
{
    constructor(firstName = "",lastName="", userName="",  emailAddress = "", password = "")
    {
        this.FirstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.emailAddress = emailAddress;
        this.password = password;
        
    }
}



"use strict";
//IIFE - Immediately Invoked Function Expression
// mean? -> anonymous self-executing function

let app;
(function(app){

    // Declare Function Variables here...
    console.log("%cDeclaring Variables", "color: red;")
    let contactObject = new Contact();
    let UserObject = new User();
    /**
     * Variable initialization in this function
     *
     */
    let logoutLI;
    let contactUsLI;
    let logoutLIParent;
    let contactUsLIParent;
    let userNameLI;

    function Start()
    {
       PageSwitcher();

        Main();
    }

    function PageSwitcher()
    {
        let name = window.location.pathname;

       let pageName = name.substring(1, name.length - 5);

       switch(pageName)
        {
            case "index":
               DisplayHomePageContent();
                break;
            case "products":
                DisplayProductsContent();
                break;
            case "services":
                DisplayServicesContent();
                break;
            case "about":
                DisplayAboutContent();
                break;
            case "contact":
                DisplayContactContent();
                break;
            case "projects":
                DisplayProjectsContent();
                break;
            case "login":
                DisplayLoginContent();
                break;
            case "register":
                DisplayRegisterContent();
                break;
            default:
                console.error("Landed in a page that is not defined");
                break;
        }

        // add a class of active to the active link
        $("#"+pageName).addClass("active");
    }

    function DisplayHomePageContent()
    {
        document.getElementById("home").className = "nav-item active";
        /* $("button").click(()=>{
            location.href = "projects.html";
        }); */

        document.title = "WEBD6201 - Home";

        let progressbar = $( "#progressBar" ).progressbar({
            value: 37
          });

        console.log(progressbar);

        $("#projectsButton").click(function(){
            $(this).fadeOut(3000, "linear", ()=>{
                $(this).fadeIn(1000, "linear", ()=>{
                    location.href = "projects.html";
                });
            });
        });
    }

    function DisplayProductsContent()
    {
        document.title = "WEBD6201 - Products";
    }

    function DisplayServicesContent()
    {
        document.title = "WEBD6201 - Services";
    }

    function DisplayAboutContent()
    {
        document.title = "WEBD6201 - About Us";
    }

    function DisplayContactContent()
    {
        document.title = "WEBD6201 - Contact Us";
        function clearForm()
        {
            //document.getElementById("contactForm").reset();
            $("#contactForm")[0].reset();
            $("#errorMessage").hide();
        }

        function validateInput(selector, condition, errorMessage)
        {
            if(condition)
            {
                $("#errorMessage").show();
                $("#errorMessage").text(errorMessage);
                $(selector).select();
                $(selector).css("border", "2px solid red");
            }
            else
            {
                $("#errorMessage").hide();
                $(selector).css("border", "1px solid #ced4da");
            }
        }

        $("#errorMessage").hide();
        $("#contactName").select();

        // Contact Name Events
        $("#contactName").blur((e)=>
        {
            validateInput("#contactName",( $("#contactName").val().length < 2),"Contact Name is Too Short");
        });

        $("#contactName").focus((e)=>
        {
            $("#contactName").select();
        });

        // Email Events
        $("#emailAddress").blur((e)=>
        {
            validateInput("#emailAddress",($("#emailAddress").val().length < 8) || (!$("#emailAddress").val().includes("@")),"Invalid Email Address");
        });

        $("#emailAddress").focus((e)=>
        {
            $("#emailAddress").select();
        });

        // Contact Number Events
        $("#contactNumber").blur((e)=>
        {
            let phonePattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
            let phoneNumber = $("#contactNumber").val();

            validateInput("#contactNumber",( !phonePattern.test(phoneNumber)),"Invalid Contact Number");
        });

        $("#contactNumber").focus((e)=>
        {
            $("#contactNumber").select();
        });

        // Contact Message Events
        $("#contactMessage").blur((e)=>
        {
            validateInput("#contactMessage",( $("#contactMessage").val().length < 2 ),"Contact Message Too Short");
        });

        $("#contactMessage").focus((e)=>
        {
            $("#contactMessage").select();
        });


        $("#contactForm").submit  ((e)=>
        {
            if(document.getElementById("contactForm").checkValidity() == false)
            {
                e.preventDefault();
                e.stopPropagation();
                console.log("form not valid");
            }

            
            let contactName = $("#contactName").val();
            let emailAddress = $("#emailAddress").val();
            let contactNumber = $("#contactNumber").val();
            let contactMessage = $("#contactMessage").val();

            console.log(`Contact Name: ${contactName}`);
            console.log(`Email Address: ${emailAddress}`);
            console.log(`Contact Number: ${contactNumber}`);
            console.log(`Contact Message: ${contactMessage}`);

            contactObject.contactName = contactName;
            contactObject.emailAddress = emailAddress;
            contactObject.contactNumber = contactNumber;
            contactObject.contactMessage = contactMessage;

            console.log(contactObject);

            clearForm();
        });

        $("#resetButton").click((e)=>
        {
            e.preventDefault();
            if(confirm("Are You Sure?"))
            {
                clearForm();
            }

            
        });
    }

    function DisplayProjectsContent()
    {
        document.title = "WEBD6201 - Projects";
    }

    function DisplayLoginContent()
    {
        document.title = "WEBD6201 - Login";

        $("#loginForm").submit  ((e)=>
        {
           
            e.preventDefault();
            e.stopPropagation();
            $("#loginForm")[0].reset();
            $("#login").hide();
            // Part B
            logoutLI = document.getElementById('logout');
            contactUsLI = document.getElementById('contactUS');
            logoutLIParent = logoutLI.parentNode;
            contactUsLIParent = contactUsLI.parentNode;
            userNameLI = contactUsLI.cloneNode(true);
            userNameLI.id = "un";
            //HRLI.firstElementChild.innerHTML = "<i class='fas fa-users'></i> Human Resources";

            userNameLI.firstElementChild.firstElementChild.className = "fas fa-users";
            userNameLI.firstElementChild.lastChild = $("#contactName").show();

            contactUsLIParent.insertBefore(userNameLI, logoutLI);
            $("#logout").show();

        });

    }

    function DisplayRegisterContent()
    {
        document.title = "WEBD6201 - Register";

        function clearForm()
        {
            $("#registerForm")[0].reset();
            $("#errorMessage").hide();
        }

        function validateInput(selector, condition, errorMessage)
        {
            if(condition)
            {
                $("#errorMessage").show();
                $("#errorMessage").text(errorMessage);
                $(selector).select();
                $(selector).css("border", "2px solid red");
            }
            else
            {
                $("#errorMessage").hide();
                $(selector).css("border", "1px solid #ced4da");
            }
        }


        $("#errorMessage").hide();
        $("#firstName").select();

        // Register Name Validation Event
        $("#firstName").blur((e)=>
        {
            validateInput("#firstName",($("#firstName").val().length < 2), "ERROR: First Name is too Short.Please try again.");

        });

        $("#firstName").focus((e)=>
        {
           $("#firstName").select();
        });

         
         $("#lastName").blur((e)=>
         {
             validateInput("#lastName",($("#lastName").val().length < 2), "ERROR: last Name is too Short.Please try again.");
 
         });
 
         $("#lastName").focus((e)=>
         {
            $("#lastName").select();
         });


         //  Register Email  validation Events
        $("#emailAddress").blur((e)=>
        {
            validateInput("#emailAddress",($("#emailAddress").val().length < 8) || (!$("#emailAddress").val().includes("@")),"ERROR: Invalid Email Address.Please try again.");
        });

        $("#emailAddress").focus((e)=>
        {
            $("#emailAddress").select();
        });


        // Register  Password Validation Events
        $("#password").blur((e)=>
        {
            validateInput("#password",($("#password").val().length < 6), "ERROR: Your entered password require minimum six characters.Please try again.");

        });

        $("#password").focus((e)=>
        {
           $("#password").select();
        });


        // got help from Ritu Patel for this event
        //  Register ConfirmPassword Validation  Events
        $("#confirmPassword").blur((e)=>
        {
            validateInput("#confirmPassword",($("#password").val()!=$("#confirmPassword").val()), "ERROR: your password and confirm pssword should be same.");

        });

        $("#confirmPassword").focus((e)=>
        {
           $("#confirmPassword").select();
        });

        $("#registerForm").submit((e)=>
        {
            if(document.getElementById("registerForm").checkValidity() == false)
            {
                e.preventDefault();
                e.stopPropagation();
                console.log("form not valid");
            }


            
            let firstName = $("#FirstName").val();
            let lastName = $("#lastName").val();
            let userName = $("#userName").val();
            let emailAddress = $("#emailAddress").val();
            let password = $("#password").val();
            

            console.log(`First Name: ${firstName}`);
            console.log(`Last Name: ${lastName}`);
            console.log(`User Name: ${userName}`);
            console.log(`Email Address: ${emailAddress}`);
            console.log(`Password: ${password}`);
            
            UserObject.firstName = firstName;
            UserObject.lastName = lastName;
            UserObject.userName = userName;
            UserObject.emailAddress = emailAddress;
            UserObject.password = password;
            

            console.log(UserObject);


            clearForm();
        });
    }

    /**
     * Main Program entry point is here
     *
     */
    function Main()
    {
       
    }
    
    

    window.addEventListener("load", Start);
})(app || (app = {}));

