
 
function autoCompleteList() {
	var availableTags = [];
	
	$.ajax ({
				url: 'autoCompleteList.php',
				type: 'GET',
				async: false,
				dataType: 'json',
				success: function(data) {
					availableTags = data;
				}
			});
	return availableTags;
}

function search(query) {
	var searchResults = {};
	var isStart = 1;
	var yPos = 10;
	var spacing = 10;
	var width = 209;
		
	$.ajax ({
				url: 'search.php',
				type: 'GET',
				data: {data: query},
				dataType: 'json',
				async: false,
				success: function(data) {
					searchResults = data;
				}
			});
	

				
	foreignObjects = d3.select("#sidebarBottom").selectAll("foreignObject")
							.data(searchResults)
							.enter()
							.append("foreignObject")
							.attr("class", "searchText")
							.attr("width", width)
							.attr("height", spacing)
							.attr("x", 0)
							.attr("y", function(d) {
							if (isStart != 1) {		
								yPos += spacing;
								return yPos;
							} else {
								isStart = 0;
								return yPos;
							}
							});
							
	htmlDOMS = foreignObjects.append("xhtml:body")
							.style("margin", 0)
							.style("padding", 0)
							.style("background-color", function(d) {
								if(d.room == "Sigma7") {
									return "#FFC600";
								}
								if (d.room == "BCF") {
									return "#06aed5";
								} 
								if (d.room == "CDCE") {
									return "#F10023";
								}
							});
	
	
	htmlLabels = htmlDOMS.append("div")
							.attr("class", function(d) {
								if(d.room == "Sigma7") {
									return "Sigma7Search";
								} 
								if (d.room == "BCF") {
									return "BCFSearch";
								} 
								if (d.room == "CDCE") {
									return "CDCESearch";
								}
							});
	
							
	htmlSearchResult = htmlLabels.append("span")
				.attr("id", "labelsSearchResult")
				.html(function(d) {
					return d.computername;
				})
				.append("div")
				.attr("id", 'labelsRackname')
				.html(function(d) {
					return "<a href='http://localhost/glpi/plugins/racks/front/rack.form.php?id="+d.rackid+"'>"+d.rackname+"</a>";
				});
				
	htmlLabels.append("span")
				.attr("id", "hidden")
				.html(function(d) {
					return 	"<div class = 'labelsPosition'>U" + d.position + "</div>"+
							"<ul class = 'labelsInfoContainer'>"+
							 	"<li class = 'labelsInfo'><a href='http://localhost/glpi/front/computer.form.php?id="+d.computerid+"'>" + d.computername + "</a></li>"+
							   	"<li class = 'labelsInfo'>" + d.modelname + "</li>"+
							   	"<li class = 'labelsInfo'>" + d.firstname + " " + d.realname + "</li>"+
							   	"<li class = 'labelsInfo'>" + d.osname + "</li>"+
							"</ul>"
				});		
	
	
	$('.searchText').click(function(event) {
		$(this).find("#hidden").slideToggle();
	});
	
	$('.ric').click(function(event) {
		$(this).find("#hidden").slideToggle();
	});
	
	searchActions = htmlDOMS.on("mouseover", function(d) {
									if (d.room == "Sigma7") {
										d3.select(this).style("background-color", "#ffeb3b");
									} 
									if (d.room == "BCF") {
										d3.select(this).style("background-color", "#4FD5D6");
									} 
									if (d.room == "CDCE") {
										d3.select(this).style("background-color", "#FF404A");
									}
										d3.select(".selected").classed("selected",false);
										d3.select("#b" + d.rackid).classed("selected", true);
									})
							.on("mouseout", function(d) {
									if(d.room == "Sigma7") {
										d3.select(this).style("background-color", "#FFC600");
									} 
									if (d.room == "BCF") {
										d3.select(this).style("background-color", "#06aed5");
									} 
									if (d.room == "CDCE") {
										d3.select(this).style("background-color", "#F10023");
										d3.select("#b" + d.rackid).attr("fill", "#F10023");
									}
									});
										

}

$(document).on('submit', function() {
        d3.selectAll(".searchText").remove();
        var query = $('#tags').val();
        search(query);
        clickSelect(0);
        return false;
    });



