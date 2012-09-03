function print_cv() {
	var print_block1 = document.getElementById('block_main_content');
	var print_block2 = document.getElementById('block_other_questions');
	var print_block3 = document.getElementById('block_experience');
	var print_css = '<link rel="stylesheet" href="./styles/print.css" type="text/css" />';
	var print_win = window.open('','','left=50,top=50,width=800,height=640,toolbar=0,scrollbars=1,status=0');
	
	print_win.document.write('<img id="me_pic" src="./pics/me_normal.jpg">');
	print_win.document.write('<div id="print" class="contentpane">');
	print_win.document.write(print_css);
	print_win.document.write(print_block1.innerHTML);
	print_win.document.write(print_block2.innerHTML);
	print_win.document.write(print_block3.innerHTML);
	print_win.document.write('</div>');
	print_win.document.close();
	
	var doc = jQuery(print_win.document);
	doc.find('div#print *').css( { 'display':'block'} );
	doc.find('div img').css( { 'display':'none'} );
	doc.find('p.answer a').css( { 'display':'inline-block'} )
	 
	print_win.focus();
	print_win.print();
	//print_win.close();		
}