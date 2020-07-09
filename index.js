$(document).ready(function() {
      
var newrowtext;    
var app = $('.app'); 
var tab  = $('.sidecont > div');    
var projapp = 1;
var estimapp = 1;    
var totalinvnum;
var singlerev;       
var settingsclick = false;
    
    
    
     
      
//dashboard data initializations       
calcNumbers();    
function calcNumbers() {
    setTimeout(function() {
        $('.totalinvnum').html($('table:not(.dashtable,#estimtable)').find('tbody tr:not(tr:last-child)').length);
        $('.totalrevfill').html('$'+localStorage.totalrevfill);
    },30)     
}      
      
   
setTimeout(function() {
    $('.projnumfill').html($('.projball').length);
},30)
    
if(typeof localStorage.totalrevfill == 'undefined' || typeof localStorage.totalrevfill == null) { localStorage.totalrevfill = 0; }  
else {
    $('.totalrevfill').html('$'+localStorage.totalrevfill);
}   
       
//tabs js 
tab.on('click', function() {
    $(this).addClass('activetab');
    tab.not(this).removeClass('activetab');
});      
    
tab.eq(0).on('click', function() {
    app.fadeOut(30);
    $('.dashboard').fadeIn(250);
    closeSettings();
    $('.settingsinner > div h4').css('color','');
}); 
tab.eq(1).on('click', function() {
    app.fadeOut(30);
    $('.invoices').fadeIn(250);
    closeSettings();
    $('.settingsinner > div h4').css('color','');
});      
tab.eq(2).on('click', function() {
    app.fadeOut(30);
    $('.estimates').fadeIn(250);
    closeSettings();
    $('.settingsinner > div h4').css('color','');
}); 
tab.eq(3).on('click', function() {
    app.fadeOut(30);
    $('.clients').fadeIn(250);
    closeSettings();
    $('.settingsinner > div h4').css('color','');
});     
tab.eq(5).on('click', function(e) {
    if(settingsclick == false) {
        openSettings();
    }
    else {
        closeSettings();
    }
    e.stopImmediatePropagation();
      
});   
$('.settingsslide .close').on('click', function() {
   closeSettings(); 
});    
    
//open/close settings panel
function closeSettings() {
    $('.settingsslide').css('left','90px');
    setTimeout(function() { 
       $('.settingsslide').fadeOut(200);    
    },30)
    settingsclick = false;
}    
function openSettings() {
    $('.settingsslide').fadeIn(50);
    setTimeout(function() {
    $('.settingsslide').css('left','110px'); 
    },30)
    settingsclick = true;
}    
       
//clear mem
$('.clearmem').on('click', function() {
    localStorage.clear();
    location.reload();
});   
    
function saveProj() {
    setTimeout(function() {
        localStorage.invoicecont = $('.invoicecont').html();
        localStorage.projects = $('.invoices').html();
        localStorage.estimatescont = $('.estimatescont').html();
        localStorage.estimates = $('.estimates').html();
        localStorage.quickproj = $('.quickprojects').html();
        localStorage.dashtable = $('.dashtable').find('tbody').html();
    },100) 
}         
$('.invoicecont').html(localStorage.invoicecont);    
$('.invoices').html(localStorage.projects);
$('.estimatescont').html(localStorage.estimatescont);    
$('.estimates').html(localStorage.estimates);    
$('.quickprojects').html(localStorage.quickproj); 
$('.dashtable').find('tbody').html(localStorage.dashtable);    
     
      
//line chart        
new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
    labels: [1,2,3,4,5,6,7,8,9,10],
    datasets: [{ 
        data: [12.0,11.0,32.4,45.7,40.59,32.0,43.3,41.5,22.0,33.1],
        label: "Revenue",
        borderColor: "#fafafa",
        fill: true,
        backgroundColor: "rgba(119, 0, 255,0.7)"
      }, { 
        data: [12,15,30,21,5,50,43,76,23,12],
        label: "Invoices",
        borderColor: "#fafafa",
        fill: true,
        backgroundColor: "rgba(254, 185, 45,0.7)"  
      }, { 
        data: [10,3,1,20,45,50,62,35,10,22],
        label: "Clients",
        borderColor: "#fafafa",
        fill: true,
        backgroundColor: "rgba(18, 148, 255,0.7)"  
      }
    ]  
  },      
  options: { 
    responsive:true,
    title: {
      display: true,
      text: 'This Month'
    },
    scales: {
            xAxes: [{
               gridLines: {
                  color: '#ececec'
               }
            }],
            yAxes: [{
               gridLines: {
                  color: '#ececec'
               } 
            }],
       } 
  }
}); 
     
//bar chart    
new Chart(document.getElementById("bar-chart"), {
  type: 'bar',
  data: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [{ 
        data: [12.0,11.0,32.4,45.7,40.59,32.0,43.3,41.5,22.0,33.1],
        label: "Revenue",
        borderColor: "#fafafa",
        fill: true,
        backgroundColor: "rgba(119, 0, 255,0.7)"
      }, { 
        data: [12,15,30,21,5,50,43,76,23,12],
        label: "Invoices",
        borderColor: "#fafafa",
        fill: true,
        backgroundColor: "rgba(254, 185, 45,0.7)"  
      }, { 
        data: [10,3,1,20,45,50,62,35,10,22],
        label: "Clients",
        borderColor: "#fafafa",
        fill: true,
        backgroundColor: "rgba(18, 148, 255,0.7)"  
      }
    ]   
  },      
  options: { 
    responsive:true,
    title: {
      display: true,
      text: 'This Year'
    } 
  }
}); 
     
//pie chart    
new Chart(document.getElementById("pie-chart"), {
  type: 'pie',
  data: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [{ 
      backgroundColor: [
        "rgba(18, 148, 255)",
        "rgba(254, 185, 45)",
        "rgba(119, 0, 255)",
        "rgba(254,45,151)",
      ],
      data: [12, 19, 17,5]
    }]
  }
});      
    
//dashbox waves     
$('.dashsmall').append('<div class="dashwaves"></div>');
    
    
//convert month num to text
nmonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    
//dashboard date func
var date = new Date();    
function dashDate() {
    month = nmonth[date.getMonth()];
    var day = date.getUTCDate();
    var year = date.getFullYear();
    return month+' '+day+', '+year;
}         
$('.dashdate').html('<i class="far fa-calendar-alt"></i>'+dashDate());    
   
 $('.monthlyprog').css('width',function() {
     var monthnum = date.getUTCDate();
     var monthprog = monthnum / 0.3;
     return monthprog+'%';
 });   
       
    
//table date format
function tableDate() {
    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    var output = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    return output;
}     
     
//Home table search
$(document).on('keyup','.dashbox input', function() {
    var value = $(this).val().toLowerCase();
    $(this).parent().siblings('table').find('tbody tr').filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});    
    
//invoices table search    
$(document).on('keyup','.tabletools input', function() {
    var value = $(this).val().toLowerCase();
    $(this).parents('.tabletools').siblings('table').find('tbody tr:not(tr:last-child)').filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});      
//add new row action (invoices)        
$(document).on('click','.invoicecont .addrow', function() {
    newrowtext = $(this).parents('tr').find('input').val();
    var that = $(this).parents('tr').find('input');
    setTimeout(function() {
        that.val('');
        newrowtext = '';
    },30) 
    //add to this table
    $('<tr><td>'+newrowtext+'<i class="fas fa-pen edittd" contenteditable="false"></i></td><td>Client Name<i class="fas fa-pen edittd" contenteditable="false"></i></td><td>Item<i class="fas fa-pen edittd" contenteditable="false"></i></td><td class="amounttd">$0<i class="fas fa-pen edittd" contenteditable="false"></i></td><td>$0 <i class="fas fa-pen edittd" contenteditable="false"></i></td><td class="datetd"><input type="date" value="'+tableDate()+'"></td><td class="statustd" data-status="ongoing"><span>Ongoing</span></td><td data-gen=""><i class="fas fa-file-invoice-dollar invbtn"></i><i class="fas fa-angle-down rowopt"></i></td></tr>').insertBefore($(this).parents('tr')); 
    //add to quick invoices on dashboard
    $('.dashtable tbody').prepend('<tr><td>'+newrowtext+'</td><td>Client Name</td><td>Item</td><td class="amounttd">$0</td><td class="datetd"><input type="date" value="'+tableDate()+'"></td><td class="statustd" data-status="ongoing"><span>Ongoing</span></td></tr>'); 
    $(this).siblings('input').focus();
    setTimeout(function() {
        calcNumbers();
    },50)
    var boxinvnum = $(this).parents('.projapp').find('table tbody tr:not(tr:last-child)').length;
    var projappid = $(this).parents('.projapp').attr('data-projapp');
    $('[data-invbox='+projappid+']').find('.boxinvfill').html(boxinvnum);
    saveProj();  
});    
    
//add new row action (estimates)          
$(document).on('click','.estimatescont .addrow', function() {
    newrowtext = $(this).parents('tr').find('input').val();
    var that = $(this).parents('tr').find('input');
    setTimeout(function() {
        that.val('');
        newrowtext = '';
    },30) 
    //add to this table
    $('<tr><td>'+newrowtext+'<i class="fas fa-pen edittd" contenteditable="false"></i></td><td>Client Name<i class="fas fa-pen edittd" contenteditable="false"></i></td><td>Item<i class="fas fa-pen edittd" contenteditable="false"></i></td><td class="amounttd">$0<i class="fas fa-pen edittd" contenteditable="false"></i></td><td>$0 <i class="fas fa-pen edittd" contenteditable="false"></i></td><td class="datetd"><input type="date" value="'+tableDate()+'"></td><td data-gen=""><i class="fas fa-file-invoice-dollar invbtn"></i><i class="fas fa-angle-down rowopt"></i></td></tr>').insertBefore($(this).parents('tr'));  
    $(this).siblings('input').focus();
    setTimeout(function() {
        calcNumbers();
    },50)
    var boxinvnum = $(this).parents('.projapp').find('table tbody tr:not(tr:last-child)').length;
    var projappid = $(this).parents('.projapp').attr('data-estimapp');
    $('[data-estimbox='+projappid+']').find('.boxinvfill').html(boxinvnum);
    saveProj();  
});    
    
$(document).on('keyup','.addnewinp', function(e) {
    var enter = e.keyCode || e.which;
    if(enter == 13){
        $(this).parents('tr').find('button').trigger('click');
    }
    saveProj();
});       
    
        
//make td editable on dblclick
$(document).on('dblclick','.invoicecont td:not([data-gen],[data-status])', function() {
    $(this).find('.fa-pen').trigger('click');
});     
    
//edit icon in td    
$(document).on('click','.invoicecont .fa-pen', function(e) {
    $(this).removeClass('fa-pen').addClass('fa-check');
    $(this).parent().attr('contenteditable','true'); 
    $(this).parent().css('outline','1.5px dotted var(--color)');
    $(this).parent().focus(); 
    $('.invoicecont td').on('keyup', function(e) {
        var enter = e.keyCode || e.which;
        if(enter == 13){
            $('.invoicecont .fa-check').trigger('click');
        } 
    });  
});        
//check icon click     
$(document).on('click','.invoicecont .fa-check', function() {
    $(this).removeClass('fa-check').addClass('fa-pen');
    $(this).parent().attr('contenteditable','false');  
    $(this).parent().css('outline','');
    saveProj(); 
});    
$(document).on('click','.amounttd .fa-check', function() {
    totalrevfill = parseFloat(localStorage.totalrevfill);
    singlerev = $(this).parents('.amounttd').html();
    singlerev = parseFloat(singlerev.replace(/\D/g,''));
    totalrevfill = totalrevfill + singlerev;
    localStorage.totalrevfill = totalrevfill;
    calcNumbers();  
});    
//click on a status bar         
$(document).on('click','td[data-status] > span', function(e) {
    var that = $(this);
    $('.statusdrop').remove();
    $('<div class="statusdrop"><div data-status="ongoing"><span>Ongoing</span></div><div data-status="process"><span>In Process</span></div><div data-status="paid"><span>Paid</span></div><small>Select a Status</small></div>').insertAfter($(this));
    setTimeout(function() {
        that.parent().find('.statusdrop').css('transform','translate(-35px,10px)');
    }) 
    e.stopImmediatePropagation();
});     
//click on the status dropdown 
$(document).on('click','.statusdrop', function() {
    $(this).fadeOut(30);
    setTimeout(function() { $('.statusdrop').remove() },40)
});  
$(document).on('click','.rowoptions', function() {
    $(this).fadeOut(30);
    setTimeout(function() { $('.rowoptions').remove() },40)
});      

//remove dropdowns on click somewhere else    
$(document).on('click', function() {
    $('.statusdrop').fadeOut(30);
    $('.rowoptions').fadeOut(30);
    setTimeout(function() { 
        $('.statusdrop').remove();
        $('.rowoptions').remove();
    },40)
    $('.quickprojects').css('z-index','');
});      
//set status       
$(document).on('click','.statusdrop span', function() {
    var status = $(this).parent().attr('data-status');
    var statustxt = $(this).html();
    $(this).parents('td[data-status]').attr('data-status',status);
    $(this).parents('td[data-status]').children('span').html(statustxt);
    saveProj();
});
      
$(document).on('click','.rowopt',function(e) {
    var that = $(this);
    $('.rowoptions').remove();
    $('<div class="rowoptions"><h6 class="insertrow"><i class="fas fa-plus"></i>Insert Row</h6><h6 class="copyrow"><i class="fas fa-copy"></i>Copy</h6><h6 class="pasterow"><i class="fas fa-paste"></i>Paste</h6><h6 class="selectrow"><i class="fas fa-check-square"></i>Select</h6><h6><i class="fas fa-arrows-alt"></i>Move</h6><h6 class="removerow"><i class="fas fa-trash"></i>Remove</h6></div>').insertAfter($(this)); $('.quickprojects').css('z-index','0');   
    setTimeout(function() {
        that.parent().find('.rowoptions').css('transform','translate(20px,10px)');
    }) 
    e.stopImmediatePropagation();
});     
        
//removerow     
$(document).on('click','.removerow',function() {
    var that = $(this);
    $(this).parents('tr').fadeOut(30);
    setTimeout(function() {
        that.parents('tr').remove();
        calcNumbers();
        saveProj();
    },50)
});    
//copyrow  
var rowcopy;    
$(document).on('click','.copyrow',function() {
    rowcopy = $(this).parents('tr').find('td').clone(); 
});
     
//paste row
$(document).on('click','.pasterow',function() {
    $(this).parents('tr').html(rowcopy); 
    var that = $(this);
    setTimeout(function() {
        that.fadeOut(0);
    });
});  
     
//selectrow
$(document).on('click','.selectrow', function() {
    $(this).parents('table').find('tbody tr:not(tr:last-child) td:last-child').append('<i class="fas fa-check-circle"></i>');
    $(this).parents('table').find('.rowopt').fadeOut(0);
    $('nav').css('width','1000px');
    $('.statusbar').fadeIn();
    $('.statusbar').html('<small>Actions</small><i class="fas fa-grip-horizontal"></i><i class="fas fa-copy"></i><i class="fas fa-arrows-alt"></i><i class="fas fa-trash"></i><button class="cancelselect">Cancel</button>');
});    
    
//insert row
$(document).on('click','.insertrow',function() {
    $('<tr><td><i class="fas fa-pen edittd" contenteditable="false"></i></td><td><i class="fas fa-pen edittd" contenteditable="false"></i></td><td><i class="fas fa-pen edittd" contenteditable="false"></i></td><td class="amounttd">$0<i class="fas fa-pen edittd" contenteditable="false"></i></td><td><i class="fas fa-pen edittd" contenteditable="false"></i></td><td class="datetd"><input type="date" value="'+tableDate()+'"></td><td data-status="ongoing"><span>Ongoing</span></td><td data-gen=""><i class="fas fa-file-invoice-dollar invbtn"></i><i class="fas fa-angle-down rowopt"></i></td></tr>').insertAfter($(this).parents('tr'));
    saveProj();
});      
var numrows;    
$(document).on('click','.fa-check-circle', function() {
    if($(this).is('[data-marked]')) {
        $(this).css('color',''); 
        $(this).removeAttr('data-marked');
        numrows = $('[data-marked]').length;
    }   
    else {
        $(this).css('color','var(--color)'); 
        $(this).attr('data-marked','true');
        numrows = $('[data-marked]').length;
    }
    
}); 
    
$(document).on('click','.statusbar .fa-trash',function() {
    $('[data-marked]').parents('tr').remove(); 
    if(numrows > 0) {
        var msg = '<p>'+numrows+' invoices have been deleted</p>';
        dropNotif(msg,2000);
    }    
    $('.statusbar').fadeOut();
    $('.fa-check-circle').remove();
    $('table').find('.rowopt').fadeIn(); 
    $('nav').css('width','');
    setTimeout(function() {
        calcNumbers();
        saveProj();
    },50) 
});
$(document).on('click','.statusbar .fa-grip-horizontal',function(e) {
    $('<div class="statusdrop statusdropnav"><div data-status="ongoing"><span>Ongoing</span></div><div data-status="process"><span>In Process</span></div><div data-status="paid"><span>Paid</span></div><small>Select a Status</small></div>').insertAfter($('nav'));
    e.stopImmediatePropagation();
});
$(document).on('click','.cancelselect',function() {
    $('.statusbar').fadeOut();
    $('.fa-check-circle').remove();
    $('table').find('.rowopt').fadeIn(); 
    $('nav').css('width','');
});     
     
     
//Generate invoice click
var invidfill;    
$(document).on('click','[data-gen] .invbtn', function() {
    var numdate = $(this).parents('tr').find('input').attr('value');
    var datearr = numdate.split('-'); 
    for(i=0;i<datearr.length;i++) {
        datearr[i] = datearr[i].replace(/^0+/, ''); 
    }
    $('.invoicewindow').fadeIn(0);
    setTimeout(function() { 
        $('.invoicewindow').css('bottom','0');
        $('.invoicewindow').css('height','');
    },100)
    invidfill = $(this).parents('tr').find('td:first-child').html();
    var clientfill = $(this).parents('tr').find('td:nth-of-type(2)').html();
    var datefill = $(this).parents('tr').find('td:nth-of-type(5) input').attr('value');
    $('.invidfill').html(invidfill);
    $('.clientfill').html(clientfill);
    $('.datefill').html(nmonth[datearr[1]-1]+' '+datearr[2]+' '+datearr[0]);
    var rowcopy = $(this).parents('tr').clone();
    $('.invoicewindow tbody').html(rowcopy);
    $('.invoicewindow tbody').find('td:nth-of-type(5),td:last-child,td:nth-last-child(2)').remove();
    $('.invoicewindow tbody').find('.datetd input').remove();
    $('.invoicewindow tbody').find('.datetd').html(nmonth[datearr[1]-1]+' '+datearr[2]+' '+datearr[0]);
    $('.invoicewindow td').attr('contenteditable','true');
    var subtotal = $(this).parents('tr').find('.amounttd').html(); 
    if(subtotal.charAt(0) == '$') {
        subtotal = subtotal.substring(1);
    }
    $('.subtotalfill').html(subtotal); 
    subtotal = parseFloat(subtotal);
    var taxes = (subtotal*0.15); 
    $('.taxesfill').html(taxes);
    var total = subtotal + taxes;
    $('.totalfill').html(total);
});     
      
$(document).on('click','.invoicewindow .close',function() {
    $(this).parent().css('bottom','-100%');
    $(this).parent().fadeOut();
});    
    
var emailclick = false;    
$('.emailfill').on('dblclick',function() {
    if(emailclick == false) {
        $(this).attr('contenteditable','true'); 
        $(this).css('outline','1px dotted var(--color)');
        $(this).focus();
        emailclick = true;
    }
    else {
        $(this).attr('contenteditable','false');
        $(this).css('outline','none');
        emailclick = false;
    }
});    
    
$(document).on('click','th',function() {
   $('table').tablesorter(); 
});     
     
$(document).on('change','table input[type=date]', function() {
    $(this).attr('value',$(this).val());
    saveProj(); 
});   
     
$(document).on('click','table .fa-pen', function() {
    $(this).removeClass('fa-pen').addClass('fa-check');
    $(this).parents('td').attr('contenteditable','true');  
    $(this).parents('td').css('outline','1px dotted var(--color)'); 
    $(this).parents('td').focus();
}); 
$(document).on('click','.invoicewindow .fa-check', function() {
    $(this).removeClass('fa-check').addClass('fa-pen');
    $(this).parents('td').attr('contenteditable','false');  
    $(this).parents('td').css('outline',''); 
});     
    
//Download invoice as pdf  
var doc = new jsPDF();
var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};
//dwnlaod invoice as pdf
$('.dlpdfbtn').click(function () {
    doc.fromHTML($('#invoicepdf').html(), 15, 15, {
        'width': 170,
            'elementHandlers': specialElementHandlers
    });
    doc.save('invoice_voicex.pdf');
    var msg = '<p>Invoice downloaded and exported to pdf file.</p>';
    dropNotif(msg,3000);
});   
//minimize  invoice window    
$('.invoicewindow .minimize').on('click', function() {
    $(this).parent().css('height','70px'); 
    $(this).siblings('img').css('cursor','pointer');
});   
//maximize invoice window    
$('.invbg').on('click', function() {
    $(this).parent().css('height','');
    $(this).siblings('img').css('cursor','default');
});        
     
var thistable;   
$(document).on('click','.deltablebtn', function() {
    var msg = '<p>Are you sure you want to delete this table?</p><button class="deltable">Delete</button>';
    dropNotif(msg,99999999);
    thistable = $(this).parents('.tablediv');
});     
      
    
//notifications
function dropNotif(msg,time) {
    $('.notifdiv').remove();
    $('<div class="notifdiv"><i class="close"></i>'+msg+'</div>').appendTo('body');
    setTimeout(function() { 
        $('.notifdiv').css('transform','scaleX(1)'); 
        $('.notifdiv p').css('transform','scaleX(1)');
    },30)
    setTimeout(function() { 
        $('.notifdiv').css('transform','');
        $('.notifdiv p').css('transform','');
        $('.notifdiv').fadeOut(150);
        setTimeout(function() { 
            $('.notifdiv').remove(); 
        },250) 
    },time);
    $('.notifdot').remove();
    $('<div class="notifdot"></div>').insertAfter($('.notificon'));
}     
    
$(document).on('click','.notifdiv .close, .deltable', function() {
    $('.notifdiv').css('transform','');
    $('.notifdiv').fadeOut(150);
    setTimeout(function() { 
        $('.notifdiv').remove(); 
    },250)  
});     
       
$(document).on('click','.deltable', function() {
    thistable.remove();
});    
//add invocie table   
$(document).on('click','.invoicecont .addtable', function() {
    $('<div class="tablediv"><h2 class="tabletitle" contenteditable="true">Table Title</h2><table id="invtable" data-sortable data-sortable-initialized="true"><div class="tabletools"> <input placeholder="Search..."><button><i class="fas fa-sort"></i></button><button><i class="fas fa-info"></i></button> <button><i class="fas fa-file-excel"></i></button><button class="deltablebtn"><i class="fas fa-trash"></i></button><button class="smartactions"><i class="fas fa-robot"></i></button></div><thead> <tr> <th>Invoice<i class="fas fa-angle-down"></i></th><th>Client<i class="fas fa-angle-down"></i></th><th>Item<i class="fas fa-angle-down"></i></th><th>Amount<i class="fas fa-angle-down"></i></th><th>Balance<i class="fas fa-angle-down"></i></th> <th>Date <i class="fas fa-angle-down"></i></th> <th>Status<i class="fas fa-angle-down"></i></th><th class="sorter-false" style="width: 100px">Generate Invoice</th> </tr></thead><tbody><tr><td colspan="2"><input class="addnewinp" placeholder="Invoice #"><button class="addrow"><i class="fas fa-plus"></i></button></td></tr></tbody></table><button class="savebtn"><i class="fas fa-save"></i>Save</button></div>').appendTo($(this).parents('.projapp'));
    $('.tablediv').fadeIn(0);
    setTimeout(function() {
        $('.tablediv').fadeIn(100);
        $('.tablediv').css('top','0');  
    },30)
    var msg = '<p>A new table has been created.</p>';
    dropNotif(msg,2000);
    saveProj();
}); 
//add estimate table    
$(document).on('click','.estimatescont .addtable', function() {
    $('<div class="tablediv"><h2 class="tabletitle" contenteditable="true">Table Title</h2><table id="estimtable" data-sortable data-sortable-initialized="true"><div class="tabletools"> <input placeholder="Search..."><button><i class="fas fa-sort"></i></button><button><i class="fas fa-info"></i></button> <button><i class="fas fa-file-excel"></i></button><button class="deltablebtn"><i class="fas fa-trash"></i></button><button class="smartactions"><i class="fas fa-robot"></i></button></div><thead> <tr> <th>Estimate<i class="fas fa-angle-down"></i></th><th>Client<i class="fas fa-angle-down"></i></th><th>Item<i class="fas fa-angle-down"></i></th><th>Amount<i class="fas fa-angle-down"></i></th><th>Balance<i class="fas fa-angle-down"></i></th><th>Date <i class="fas fa-angle-down"></i></th><th class="sorter-false" style="width: 100px">Generate Estimation</th> </tr></thead><tbody><tr><td colspan="2"><input class="addnewinp" placeholder="Estimate #"><button class="addrow"><i class="fas fa-plus"></i></button></td></tr></tbody></table><button class="savebtn"><i class="fas fa-save"></i>Save</button></div>').appendTo($(this).parents('.projapp'));
    $('.tablediv').fadeIn(0);  
    setTimeout(function() {
        $('.tablediv').fadeIn(100);
        $('.tablediv').css('top','0');  
    },30)
    var msg = '<p>A new table has been created.</p>';
    dropNotif(msg,2000);
    saveProj();
});     
     
$('.addprojbtn').on('click', function(e) {
    $('.projselect').remove();
    $('<div class="projselect"><div><i class="far fa-folder-open addprojinv"></i><small>Invoicing</small></div><div><i class="fas fa-tag addprojestim"></i><small>Estimations</small></div><div><i class="fas fa-user-friends addprojclient"></i><small>Clients</small></div></div>').appendTo($('.addprojbtncont'));
    $('.projselect').fadeIn(100);
    $('.projselect').css({'left':'50px','transform':'scale(1) translateY(-130px)'});
    e.stopImmediatePropagation(); 
});   
$(document).on('click','.addprojinv', function(e) {
    $('<div class="newbox"><h4>New Invoice</h4><input placeholder="Project Name"><div class="projcolorpick"><h6>Project Color</h6><div data-color="1"></div><div data-color="2"></div><div data-color="3"></div><div data-color="4"></div><div data-color="5"></div><div data-color="6"></div><div data-color="7"></div><div data-color="8"></div><div data-color="9"></div><div data-color="10"></div></div><button class="createinv">Create Invoice</button></div>').insertAfter($('.addprojbtncont'));
    $('.newbox input').focus();
    setTimeout(function() { 
        $('.newbox').css('left','70px'); 
        $('[data-color=3]').trigger('click');
    },30)  
    projcolorarr[1] = 'linear-gradient(324deg, rgba(119,0,255,1) 0%, rgba(41,4,255,1) 100%)';
    e.stopImmediatePropagation();
});       
$(document).on('click','.addprojestim', function(e) {
    $('<div class="newbox"><h4>New Estimate</h4><input placeholder="Estimate Name"><div class="projcolorpick"><h6>Project Color</h6><div class="estimcolor1"></div></div><button class="createestim">Create Estimate</button></div>').insertAfter($('.addprojbtncont'));
    $('.newbox input').focus();
    setTimeout(function() { 
        $('.newbox .estimcolor1').trigger('click');
        $('.newbox').css('left','70px'); 
    },30)  
    projcolorarr[1] = '#001E30';
    e.stopImmediatePropagation();
}); 
$(document).on('click','.addprojclient', function(e) {
    $('<div class="newbox"><h4>New Client</h4><input placeholder="Client Name"><button class="createclient">Create Client</button></div>').insertAfter($('.addprojbtncont'));
    $('.newbox input').focus();
    setTimeout(function() { 
        $('.newbox').css('left','70px'); 
    },30)  
    projcolorarr[1] = '#001E30';
    e.stopImmediatePropagation();
});  
    
$(document).on('click','.projselect i', function(e) {
    $('.projselect').remove();
    $('.newbox').remove();
});
    
$('.addinvbtn').on('click', function(e) {
    $('.addprojbtn').trigger('click');
    $('.addprojinv').trigger('click');
    e.stopImmediatePropagation();
}); 
$('.addestim').on('click', function(e) {
    $('.addprojbtn').trigger('click');
    $('.addprojestim').trigger('click');
    e.stopImmediatePropagation();
});  
$('.addclient').on('click', function(e) {
    $('.addprojbtn').trigger('click');
    $('.addprojclient').trigger('click');
    e.stopImmediatePropagation();
});      
$(document).on('click','.newbox', function(e) {
    e.stopImmediatePropagation();
});     
$(document).on('click', function() {
    $('.newbox').css('left','');
    $('.newbox').fadeOut(200);
    $('.projselect').css({'left':'','transform':''}); 
    $('.projselect').fadeOut(100);
    setTimeout(function() { 
        $('.newbox').remove(); 
        $('.projselect').remove();
    },300) 
});       
    
$(document).on('keypress','.newbox input', function(e) {
    var enter = e.keyCode || e.which;
    if(enter == 13){
        $(this).attr('disabled', true);
        $(this).siblings('button').trigger('click');
        $(this).removeAttr('disabled');
    }  
});      
    
var projcolor;
var projcolorarr = [];    
$(document).on('click','.projcolorpick div', function() {
    $('.projcolorpick div').css({'border':'','transform':''});
    $(this).css({'border':'2px solid #fff','transform':'scale(1.2)'});
    projcolor = $(this).css('background');
    projcolorarr = projcolor.split('repeat');
    projcolor = projcolorarr[0];
    projcolorarr = projcolor.split('linear-gradient');
});           
//main create invoice btn action    
$(document).on('click','.createinv', function() {
    var projname = $(this).siblings('input').val();
    if(!$(this).siblings('input').val()) {
        var msg = '<p>You must add an invoice title</p>';
        time = 2000; 
        dropNotif(msg,time);    
    } 
    else {
        for(i=1;i<=20;i++) {
            if($('[data-invbox='+i+']').length) {
                //if project exists, do nothing
            }
            else {
                projapp = i; //if it project doesnt exist
                break;
            } 
        }       
        $('<div class="projapp" data-projapp="'+projapp+'"></div>').appendTo($('.invoicecont .igrid'));
        $('.menuproj').trigger('click');
        var firstletter = projname.charAt(0);
        var msg = '<p>Your new invoice '+projname+' has been created.</p>';
        time = 3000;
        setTimeout(function() { dropNotif(msg,time); },400)
        setTimeout(function() {
            $('<div class="invboxsmall" data-invbox="'+projapp+'" style="background:linear-gradient'+projcolorarr[1]+'"><i class="fas fa-ellipsis-h boxbtn"></i><h4>'+projname+'</h4> <ul> <h6>Summary</h6> <li><i class="fas fa-file-invoice-dollar"></i>Invoices<span class="boxinvfill">0</span></li><li><i class="fas fa-user-tag"></i>Clients<span class="boxclientsfill">0</span></li><li><i class="fas fa-dollar-sign"></i>Revenue<span class="boxrevfill">$0</span></li></ul> <button class="addtable">Add Table</button></div>').appendTo($('.invoices .igrid'));
             
            $('<div class="invbox" data-invbox="'+projapp+'" style="background:linear-gradient'+projcolorarr[1]+'"><i class="fas fa-ellipsis-h boxbtn"></i><h4>'+projname+'</h4> <ul> <h6>Summary</h6> <li><i class="fas fa-file-invoice-dollar"></i>Invoices<span class="boxinvfill">0</span></li><li><i class="fas fa-user-tag"></i>Clients<span class="boxclientsfill">0</span></li><li><i class="fas fa-dollar-sign"></i>Revenue<span class="boxrevfill">$0</span></li></ul> <button class="addtable">Add Table</button></div>').appendTo($('[data-projapp='+projapp+']'));
            
            $('<div class="projball" data-invbox="'+projapp+'" style="background:linear-gradient'+projcolorarr[1]+'"><span>'+firstletter+'</span><small>'+projname+'</small></div>').appendTo($('.quickprojects'));
        },30)  
        setTimeout(function() { 
            $('.invboxsmall, .projball').fadeIn(100);
            $('.invboxsmall, .projball').css('transform','scale(1)'); 
            $('.projnumfill').html($('.projball').length);
        },100)
        setTimeout(function() { projapp = -1; },200);
    }
    saveProj();
});     
     
//main create estimate btn action
$(document).on('click','.createestim', function() {
    var projname = $(this).siblings('input').val();
    if(!$(this).siblings('input').val()) {
        var msg = '<p>You must add an estimate title</p>';
        time = 2000; 
        dropNotif(msg,time);    
    } 
    else {
        for(i=1;i<=20;i++) {
            if($('[data-estimbox='+i+']').length) {
                //if project exists, do nothing
            }
            else {
                estimapp = i; //if it project doesnt exist
                break;
            }  
        }       
        $('<div class="projapp" data-estimapp="'+estimapp+'"></div>').appendTo($('.estimatescont .igrid'));
        $('.menuestim').trigger('click');
        var firstletter = projname.charAt(0);
        var msg = '<p>Your new estimate '+projname+' has been created.</p>';
        time = 3000;
        setTimeout(function() { dropNotif(msg,time); },400)
        setTimeout(function() {
            $('<div class="estimboxsmall" data-estimbox="'+estimapp+'"><i class="fas fa-ellipsis-h boxbtn"></i><h4>'+projname+'</h4> <ul> <h6>Summary</h6> <li><i class="fas fa-file-invoice-dollar"></i>Estimates<span class="boxinvfill">0</span></li><li><i class="fas fa-user-tag"></i>Clients<span class="boxclientsfill">0</span></li></ul> <button class="addtable">Add Table</button></div>').appendTo($('.estimates .igrid'));
             
            $('<div class="estimbox" data-estimbox="'+estimapp+'"><i class="fas fa-ellipsis-h boxbtn"></i><h4>'+projname+'</h4> <ul> <h6>Summary</h6> <li><i class="fas fa-file-invoice-dollar"></i>Estimates<span class="boxinvfill">0</span></li><li><i class="fas fa-user-tag"></i>Clients<span class="boxclientsfill">0</span></li></ul> <button class="addtable">Add Table</button></div>').appendTo($('[data-estimapp='+estimapp+']'));
        },30)  
        setTimeout(function() { 
            $('.estimboxsmall').fadeIn(100);
            $('.estimboxsmall').css('transform','scale(1)'); 
        },100)
        setTimeout(function() { estimapp = -1; },200);
    }
    saveProj();
});       
     
    
$(document).on('click','.boxbtn',function(e) {
    $('.boxmenu').remove();
    $('<div class="boxmenu"><h6><i class="fas fa-folder-open"></i>Open Project</h6><h6><i class="fas fa-font"></i>Rename</h6><h6><i class="fas fa-trash"></i>Delete</h6><h6><i class="fas fa-palette"></i>Change Color</h6><h6><i class="fas fa-info-circle"></i>Project Info</h6></div>').insertAfter($(this));
    setTimeout(function() {
        $('.boxmenu').css('top','60px');
    },30)
    e.stopImmediatePropagation();
});      
$(document).on('click', function() {
    $('.boxmenu').css('top','');
    $('.boxmenu').fadeOut();
    setTimeout(function() {
        $('.boxmenu').remove();
    },100)
});    
$(document).on('click','.boxmenu',function(e) {
    e.stopImmediatePropagation();
}); 
$(document).on('click','.boxmenu h6:nth-of-type(3)',function(e) {
    var invboxid = $(this).parents('.invboxsmall').attr('data-invbox');
    $('[data-invbox='+invboxid+']').fadeOut(100);
    setTimeout(function() { 
        $('[data-invbox='+invboxid+'],[data-projapp='+invboxid+']').remove();
        saveProj();
    },100)
});
$(document).on('click','.boxmenu h6:nth-of-type(3)',function(e) {
    var estimboxid = $(this).parents('.invboxsmall').attr('data-invbox');
    $('[data-estimbox='+estimboxid+']').fadeOut(100);
    setTimeout(function() { 
        $('[data-estimbox='+estimboxid+'],[data-projapp='+estimboxid+']').remove();
        saveProj();
    },100)
});    
$(document).on('click','.boxmenu h6:first-child', function() {
    $(this).parents('.invboxsmall').trigger('click');
});  
$(document).on('click','.boxmenu h6:first-child', function() {
    $(this).parents('.estimboxsmall').trigger('click');
});      
    
$(document).on('click','.invboxsmall,.projball', function() {
    var invboxid = $(this).attr('data-invbox'); 
    $('[data-projapp]').fadeOut(0);
    $('[data-projapp='+invboxid+']').fadeIn(0);
    $('.app,.invoices').fadeOut(20);
    $('.invoicecont').fadeIn(250);
}); 
    
$(document).on('click','.estimboxsmall', function() {
    var estimboxid = $(this).attr('data-estimbox'); 
    $('[data-projapp]').fadeOut(0);
    $('[data-projapp='+estimboxid+']').fadeIn(0);
    $('.app').fadeOut(20);
    $('.estimatescont').fadeIn(250);
});      
    
$(document).on('click','.savebtn',function() {
   var msg = '<p>Your project has been saved successfully.';
    dropNotif(msg,2000); 
});    

    
$('nav input').on('focus', function() {
    if (window.matchMedia('(max-width: 1100px)').matches) {
         
    } 
    else {
        $('nav').css({'width':'1000px','box-shadow':'0px 0px 26px -11px rgba(119,0,255,0.5)'});
    }
    
});  
$('nav input').on('blur', function() {
    $('nav').css({'width':'','box-shadow':''});
});      
      
$('.sidebargripcont').on('click', function(e) {
    if (window.matchMedia('(max-width: 1000px)').matches) {
        $('.sidebar').css({'left':'20px','height':'90%','cursor':'default'});
        $('.fa-grip-vertical').fadeOut(50);
        $('.sidecont,.logo').fadeIn();
        $(document).on('click',function() {
            $('.sidebar').css({'left':'','height':'','cursor':''});
            $('.fa-grip-vertical').fadeIn();
            $('.sidecont,.logo').fadeOut();
        });
    } 
    else {
        $('.fa-grip-vertical').fadeOut();
        $('.sidecont,.logo').fadeIn();
    }
    e.stopImmediatePropagation();
});     
    
      
//time of day var intiialize
timeOfDay();
function timeOfDay() {
    var timeofday = ''; 
    var thedate = new Date();    
    var thetime = thedate.getHours();      
    if(thetime > 6 && thetime <= 11) {
        timeofday = 'morning';
    }    
    else if(thetime >= 12 && thetime < 18) {
        timeofday = 'afternoon';
    }    
    else {
        timeofday = 'evening';
    }    
    $('.timeofday').html(timeofday);   
}     
    
    
$('.tabletitle').blur(function() {
    saveProj();
});     
    
$('.dashaddbtn').on('click', function() {
   if($(this).parents('.dashbox').find('table tbody tr').length < 5) {
       
   }
    else {
    
    }
        
});    
$(document).on('keyup','.dashtable td', function(e) {
    var enter = e.keyCode || e.which;
    if(enter == 13){
        $(this).attr('contenteditable','false');
    }
});     
$(document).on('click','.dashtable td', function() {
    $(this).not('.statustd,.datetd').attr('contenteditable','true');
});
     
    
    
$('.settingsinner > div:first-child').on('click', function() {
    $('.settingsinner > div h4').css('color','');
    $(this).find('h4').css('color','var(--color)'); 
    closeSettings();
    app.fadeOut(30);
    $('.settingsprofile').fadeIn(200);
});
$('.settingsinner > div:nth-of-type(2)').on('click', function() {
    $('.settingsinner > div h4').css('color','');
    $(this).find('h4').css('color','var(--color)'); 
    closeSettings();
    app.fadeOut(30);
    $('.settingsgeneral').fadeIn(200);
});    
$('.settingsinner > div:nth-of-type(3)').on('click', function() {
    $('.settingsinner > div h4').css('color','');
    $(this).find('h4').css('color','var(--color)'); 
    closeSettings();
    app.fadeOut(30);
    $('.settingstheme').fadeIn(200);
});        
$('.settingsinner > div:nth-of-type(4)').on('click', function() {
    $('.settingsinner > div h4').css('color','');
    $(this).find('h4').css('color','var(--color)'); 
    closeSettings();
    app.fadeOut(30);
    $('.settingsinvoices').fadeIn(200);
});     
$('.settingsinner > div:nth-of-type(5)').on('click', function() {
    $('.settingsinner > div h4').css('color','');
    $(this).find('h4').css('color','var(--color)'); 
    closeSettings();
    app.fadeOut(30);
    $('.settingsintegrations').fadeIn(200);
});     
     
      
$('.boxsec button:not(.boxsecprof button)').on('click', function() {
    var msg = '<p>Your settings were successfully saved.</p>';
    dropNotif(msg,2500);
});    
$(document).on('click', function() {
    closeSettings();
});    
$('.settingsslide').on('click', function(e) {
    e.stopImmediatePropagation();
})      
    
  
    
    
    
    
     
    
    
});
