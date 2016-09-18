function main() {
	var a = $('.navbar-nav .active')
	a.toggleClass('active');
	$("#about-btn").addClass('active');
}
$(document).ready(main());