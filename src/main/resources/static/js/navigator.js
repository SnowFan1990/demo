$(function() {
	var liArray = $("#reportMenu li");
	 $("#reportMenu li:eq(0)").find('a').click(function(){ 
			$.get("/return/reportlist", function(data, status){
				$(".content-wrapper").empty();
				$(".content-wrapper").html(data);
			});
		});
	 
	 $("#reportMenu li:eq(1)").find('a').click(function(){ 
			$.get("/return/passRateTrend", function(data, status){
				$(".content-wrapper").empty();
				$(".content-wrapper").html(data);
			});
		});
	 
	 $("#reportMenu li:eq(2)").find('a').click(function(){ 
			$.get("/return/executeTimeTrend", function(data, status){
				$(".content-wrapper").html(data);
			});
		});
	 
	 $("#reportMenu li:eq(3)").find('a').click(function(){ 
			$.get("/api/v1/public/page/total/interfaces", function(data, status){
				$(".content-wrapper").empty();
				$(".content-wrapper").html(data);
			});
		});
	 
	 $("#reportMenu li:eq(4)").find('a').click(function(){ 
			$.get("/api/v1/public/page/total/interface_automation", function(data, status){
				$(".content-wrapper").empty();
				$(".content-wrapper").html(data);
			});
		});
	 
	 $("#reportMenu li:eq(5)").find('a').click(function(){ 
			$.get("/api/v1/public/page/total/interface_automation_trend", function(data, status){
				$(".content-wrapper").empty();
				$(".content-wrapper").html(data);
			});
		});
	 
	 $("#reportMenu li:eq(6)").find('a').click(function(){ 
			$.get("/api/v1/public/page/automation_coverrate", function(data, status){
				$(".content-wrapper").empty();
				$(".content-wrapper").html(data);
			});
		});
	 
	 $("#reportMenu li:eq(7)").find('a').click(function(){ 
			$.get("/api/v1/public/page/automation_coverrate_trend", function(data, status){
				$(".content-wrapper").empty();
				$(".content-wrapper").html(data);
			});
		});
	
	 $("#reportMenu li:eq(8)").find('a').click(function(){ 
			$.get("/api/v1/public/page/order_testcases", function(data, status){
				$(".content-wrapper").html(data);
			});
		});
	 $("#reportMenu li:eq(9)").find('a').click(function(){ 
			$.get("/api/v1/public/page/order_dept_interfaces", function(data, status){
				$(".content-wrapper").html(data);
			});
		});
	 $("#reportMenu li:eq(10)").find('a').click(function(){ 
			$.get("/api/v1/public/page/order_dept_exetimes", function(data, status){
				$(".content-wrapper").html(data);
			});
		});
});