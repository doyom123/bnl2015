var current = 0;
var currentRoom = 183;

function plotLocations() {
			$.ajax ({
				url: 'config.php',
				type: 'POST',
				data: {data: 183},
				dataType: 'json',
				async: false,
				success: function(data) {
					racksBCF = data;
				}
			});
			$.ajax ({
				url: 'config.php',
				type: 'POST',
				data: {data: 185},
				dataType: 'json',
				async: false,
				success: function(data) {
					racksS7 = data;
				}
			});
			$.ajax ({
				url: 'config.php',
				type: 'POST',
				data: {data: 186},
				dataType: 'json',
				async: false,
				success: function(data) {
					racksCDCE = data;
				}
			});
			
			var width = screen.width;
			var height = screen.height;
			var xPosStart = 0;
			var yPosStart = 0;
			var xPos = 0;
			var yPos = 0;
			var xSpacing = 24;
			var ySpacing = 24;
			
			lineDataForensics = [{ "x": 0 * xSpacing,  "y": 0 * ySpacing },  { "x": 12.5 * xSpacing, "y" : 0 * ySpacing},
								{ "x": 12.5 * xSpacing, "y": 7 * ySpacing },  { "x": 16.5 * xSpacing, "y" : 7 * ySpacing },
								{ "x": 16.5 * xSpacing, "y": 32 * ySpacing}, { "x": 34.5 * xSpacing, "y" : 32 * ySpacing },
								{ "x": 34.5 * xSpacing, "y": 45 * ySpacing}, { "x": 0 * xSpacing, "y" : 45 * ySpacing },
								{ "x": 0 * xSpacing, "y": 0 * ySpacing}];
			
			lineDataStorage = [{ "x": 0.5 * xSpacing,  "y": 7 * ySpacing },  { "x": 5 * xSpacing, "y" : 7 * ySpacing},
								{ "x": 5 * xSpacing, "y": 5 * ySpacing },  { "x": 13 * xSpacing, "y" : 5 * ySpacing },
								{ "x": 13 * xSpacing, "y": 7 * ySpacing },  { "x": 16 * xSpacing, "y" : 7 * ySpacing }];
			lineDataStorage1 = [{ "x": 18 * xSpacing,  "y": 7 * ySpacing },  { "x": 21 * xSpacing, "y" : 7 * ySpacing}];
								
			lineDataLinuxFarm = [{ "x": 0.5 * xSpacing,  "y": 0 * ySpacing },  { "x": 21 * xSpacing, "y" : 0 * ySpacing},
								{ "x": 21 * xSpacing, "y": 25 * ySpacing },  { "x": 0.5 * xSpacing, "y" : 25 * ySpacing },
								{ "x": 0.5 * xSpacing, "y": 0 * ySpacing}];
			
			lineDataQCDOC= [{ "x": 4.5 * xSpacing,  "y": 25 * ySpacing },  { "x": 25.1 * xSpacing, "y" : 25 * ySpacing},
								{ "x": 25.1 * xSpacing, "y": 45 * ySpacing },  { "x": 0 * xSpacing, "y" : 45 * ySpacing },
								{ "x": 0 * xSpacing, "y": 32 * ySpacing}, { "x": 4.5 * xSpacing, "y" : 25 * ySpacing }];
								
			
			
			lineDataBCF = [{ "x": 0.5 * xSpacing,  "y": 0 * ySpacing },  { "x": 45.5 * xSpacing, "y" : 0 * ySpacing},
								{ "x": 45.5 * xSpacing, "y": 25 * ySpacing },  { "x": 41 * xSpacing, "y" : 32 * ySpacing },
								{ "x": 41 * xSpacing, "y": 45 * ySpacing}, { "x": 22.5 * xSpacing, "y" : 45 * ySpacing },
								{ "x": 22.5 * xSpacing, "y": 32 * ySpacing}, { "x": 4.5 * xSpacing, "y" : 32 * ySpacing },
								{ "x": 4.5 * xSpacing, "y": 7 * ySpacing}, { "x": 0.5 * xSpacing, "y" : 7 * ySpacing },
								{ "x": 0.5 * xSpacing,  "y": 0 * ySpacing }];
			
			lineDataS7 = [{ "x": 0 * xSpacing,  "y": 0 * ySpacing },  { "x": 23 * xSpacing, "y" : 0 * ySpacing},
								{ "x": 23 * xSpacing, "y": 7 * ySpacing },  { "x": 12 * xSpacing, "y" : 7 * ySpacing },
								{ "x": 12 * xSpacing, "y": 37 * ySpacing}, { "x": 0 * xSpacing, "y" : 37 * ySpacing },
								{ "x": 0 * xSpacing,  "y": 0 * ySpacing }];
				
			lineDataCDCE = [{ "x": 2 * xSpacing,  "y": 0 * ySpacing },
								{ "x": 2 * xSpacing, "y": 13 * ySpacing },  { "x": 0 * xSpacing, "y" : 13 * ySpacing },
								{ "x": 0 * xSpacing, "y": 31 * ySpacing}, { "x": 52 * xSpacing, "y" : 31 * ySpacing },
								{ "x": 52 * xSpacing, "y": 0 * ySpacing}, { "x": 2 * xSpacing, "y" : 0 * ySpacing }];
		
			var lineFunction = d3.svg.line()
								.x(function(d) { return d.x; })
								.y(function(d) { return d.y; })
								.interpolate("linear");

			var svg = d3.select("body")
							.append("svg")
							.attr("id", "display")
							.attr("width", width)
							.attr("height", height)
							
							.call(d3.behavior.zoom().scaleExtent([.3,1.5]).on("zoom", function () {
								svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
							}))
							.append("g");
			
			var defs = svg.append('defs');
			var filter = defs.append('filter')
								.attr('id','dropshadow');
			
			filter.append('feGaussianBlur')
					.attr('in', 'SourceAlpha')
					.attr('stdDeviation', 4)
					.attr('result', 'blur');
					
			filter.append('feOffset')
					.attr('in', 'blur')
					.attr('dx', 6)
					.attr('dy', 10)
					.attr('result', 'offsetBlur');
					
			var feMerge = filter.append('feMerge');
			feMerge.append('feMergeNode')
					.attr('in', 'offsetBlur');
			feMerge.append('feMergeNode')
					.attr('in', 'SourceGraphic');
			
							
			var tooltip = d3.select("body").append("div")
							.attr("class", "tooltip")
							.style("opacity", 0);
			
			var tooltipSearch = d3.select("body").append("div")
									.attr("class", "tooltipSearch")
									.style("opacity", 0);
			
			var info = d3.select("#infoContainer");
			
			
			var BCFposX = 289;
			var BCFposY = 920;
			var CDCEposX = 1910;
			var CDCEposY = 920;
			var lineBorderS7shadow = svg.append("path")
								.attr("d", lineFunction(lineDataS7))
								.attr("stroke", "black")
								.attr("stroke-width", 2)
								//.attr("filter", "url(#dropshadow)")
								.style("fill", "#333333")
								.attr("transform", "translate(10,10)");
			var lineBorderS7 = svg.append("path")
								.attr("d", lineFunction(lineDataS7))
								.attr("stroke", "black")
								.attr("stroke-width", 2)
								//.attr("filter", "url(#dropshadow)")
								.style("fill", "white");	
			
			var lineBorderForensics = svg.append("path")
								.attr("d", lineFunction(lineDataForensics))
								.attr("stroke", "black")
								.attr("stroke-width", 2)
								.attr("fill", "#EEEEEE")
								
								.attr("transform", "translate(0,920)");
			
			var lineBorderQCDOC = svg.append("path")
								.attr("d", lineFunction(lineDataQCDOC))
								.attr("stroke", "black")
								.attr("stroke-width", 2)
								.attr("fill", "#EEEEEE")
								
								.attr("transform", "translate(1270,920)");
			var lineBorderBCFshadow = svg.append("path")
								.attr("d", lineFunction(lineDataBCF))
								.attr("stroke", "black")
								.attr("stroke-width", 2)
								.attr("fill", "#333333")
								//.attr("filter", "url(#dropshadow)")
								.attr("transform", "translate(299,930)");	
			var lineBorderBCF = svg.append("path")
								.attr("d", lineFunction(lineDataBCF))
								.attr("stroke", "black")
								.attr("stroke-width", 2)
								.attr("fill", "white")
								//.attr("filter", "url(#dropshadow)")
								.attr("transform", "translate(289,920)");	
			var lineBorderLinuxFarmshadow = svg.append("path")
								.attr("d", lineFunction(lineDataLinuxFarm))
								.attr("stroke", "black")
								.attr("stroke-width", 2)
								.attr("fill", "#333333")
								//.attr("filter", "url(#dropshadow)")
								.attr("transform", "translate(1379,930)");
			var lineBorderLinuxFarm = svg.append("path")
								.attr("d", lineFunction(lineDataLinuxFarm))
								.attr("stroke", "black")
								.attr("stroke-width", 2)
								.attr("fill", "white")
								//.attr("filter", "url(#dropshadow)")
								.attr("transform", "translate(1369,920)");
			var lineBorderStorage = svg.append("path")
								.attr("d", lineFunction(lineDataStorage))
								.attr("stroke", "black")
								.attr("stroke-width", 2)
								
								.style("fill", "white")
								.attr("transform", "translate(1369,920)");
			var lineBorderStorage1 = svg.append("path")
								.attr("d", lineFunction(lineDataStorage1))
								.attr("stroke", "black")
								.attr("stroke-width", 2)
								
								.style("fill", "white")
								.attr("transform", "translate(1369,920)");								
			var lineBorderCDCEshadow = svg.append("path")
								.attr("d", lineFunction(lineDataCDCE))
								//.attr("filter", "url(#dropshadow)")
								.attr("stroke", "black")
								.attr("stroke-width", 2)
								.attr("fill", "#333333")
								.attr("transform", "translate(1920,930)");	
			var lineBorderCDCE = svg.append("path")
								.attr("d", lineFunction(lineDataCDCE))
								//.attr("filter", "url(#dropshadow)")
								.attr("stroke", "black")
								.attr("stroke-width", 2)
								.attr("fill", "white")
								.attr("transform", "translate(1910,920)");						
			
			
			var blocksBCF = svg.selectAll("rect.BCF")
							.data(racksBCF)
							.enter()
							.append("a")
							
							.append("rect")
							
							.attr("class", "blockBCF")
							.attr("id", function(d) {
								return "b" + String(d.id);
							})
							.attr("width", function(d) {
								if(d.otherserial == 'H') {
									return d.depth;
								} else {
									return d.width;
								}
						})
						
						.attr("fill", "#06aed5")
						.attr("stroke-width", 2)
						.attr("stroke", "black")
						.attr("height", function(d) {
							if(d.otherserial == 'H') {
									return d.width;
								} else {
									return d.depth;
								}
							
						})
						.attr("x", function(d) {
							var location = d.serial.split(',');
							return location[0] * xSpacing + BCFposX;
						})
						.attr("y", function(d) {
							var location = d.serial.split(',');
							return location[1] * ySpacing + BCFposY;
						});
					
						
						
			var blocksS7 = svg.selectAll("rect.S7")
							.data(racksS7)
							.enter()
							.append("a")
							
							.append("rect")
							.attr("class", "blockS7")
							.attr("id", function(d) {
								return "b" + d.id;
							})
							.attr("width", function(d) {
							if(d.otherserial == 'H') {
									return d.depth;
								} else {
									return d.width;
								}
						})
						
						.attr("fill", "#FFC600")
						.attr("stroke-width", 2)
						.attr("stroke", "black")
						.attr("height", function(d) {
							if(d.otherserial == 'H') {
									return d.width;
								} else {
									return d.depth;
								}
						})
						.attr("x", function(d) {
							var location = d.serial.split(',');
							return location[0] * xSpacing;
						})
						.attr("y", function(d) {
							var location = d.serial.split(',');
							return location[1] * ySpacing;
						});
			var blocksCDCE = svg.selectAll("rect.CDCE")
							.data(racksCDCE)
							.enter()
							.append("a")
							
							.append("rect")
							.attr("class", "blockCDCE")
							.attr("id", function(d) {
								return "b" + d.id;
							})
							.attr("width", function(d) {
								if(d.otherserial == 'H') {
									return d.depth;
								} else {
									return d.width;
								}
						})
						
						.attr("fill", "#F10023")
						.attr("stroke-width", 2)
						.attr("stroke", "black")
						.attr("height", function(d) {
							if(d.otherserial == 'H') {
									return d.width;
								} else {
									return d.depth;
								}
						})
						.attr("x", function(d) {
							var location = d.serial.split(',');
							return location[0] * xSpacing + CDCEposX;
						})
						.attr("y", function(d) {
							var location = d.serial.split(',');
							return location[1] * ySpacing + CDCEposY;
						});
						
			
						
			var textSigma7 = svg.selectAll("textSVG")
							.data(racksS7)
							.enter()
							.append("text")
							.attr("class", "textName")
							.attr("text-anchor", "middle")
							.attr("fill", "black")
							.attr("width", function(d) {
								if (d.otherserial == 'H') {
									return d.depth;
								} else {
									return d.width;
								}
							})
							.style("pointer-events", "none")
							.attr("x", function(d) {
								var location = d.serial.split(',');
								if (d.otherserial == 'H') {
									return location[0] * xSpacing + d.depth/2;
								} else {									
									return location[0] * xSpacing + d.width/2;
								}
							})
							.attr("y", function(d) {
								var location = d.serial.split(',');
								if (d.otherserial == 'H') {
									return location [1] * ySpacing + d.width/2;
								} else {
									return location[1] * ySpacing + d.depth/2;
								}
							})
							.text(function(d) {
								return d.name;	
							});
			var textBCF = svg.selectAll("textBCF")
							.data(racksBCF)
							.enter()
							.append("text")
							.attr("class", "textName")
							.attr("text-anchor", "middle")
							.attr("fill", "black")
							.attr("width", function(d) {
								if (d.otherserial == 'H') {
									return d.depth;
								} else {
									return d.width;
								}
							})
							.style("pointer-events", "none")
							.attr("x", function(d) {
								var location = d.serial.split(',');
								if (d.otherserial == 'H') {
									return location[0] * xSpacing + d.depth/2 + BCFposX;
								} else {									
									return location[0] * xSpacing + d.width/2 + BCFposX;
								}
							})
							.attr("y", function(d) {
								var location = d.serial.split(',');
								if (d.otherserial == 'H') {
									return location [1] * ySpacing + d.width/2 + BCFposY;
								} else {
									return location[1] * ySpacing + d.depth/2 + BCFposY;
								}
							})
							
							
							.text(function(d) {
								return d.name;	
							})
							;
							
			var textCDCE = svg.selectAll("textCDCE")
							.data(racksCDCE)
							.enter()
							.append("text")
							.attr("class", "textName")
							.attr("text-anchor", "middle")
							.attr("fill", "black")
							.attr("width", function(d) {
								if (d.otherserial == 'H') {
									return d.depth;
								} else {
									return d.width;
								}
							})
							.style("pointer-events", "none")
							.attr("x", function(d) {
								var location = d.serial.split(',');
								if (d.otherserial == 'H') {
									return location[0] * xSpacing + d.depth/2 + CDCEposX;
								} else {									
									return location[0] * xSpacing + d.width/2 + CDCEposX;
								}
							})
							.attr("y", function(d) {
								var location = d.serial.split(',');
								if (d.otherserial == 'H') {
									return location [1] * ySpacing + d.width/2 + CDCEposY;
								} else {
									return location[1] * ySpacing + d.depth/2 + CDCEposY;
								}
							})
							
							
							
							
							
							.text(function(d) {
								return d.name;	
							});
								
			var blocks_actionsS7 =  blocksS7.on("mouseover", function(d) {
												tooltip.transition()
													   .duration(10)
													   .style("opacity", 1);
												tooltip.html(d.name)
													   .style("left", (d3.event.pageX) + 15 + "px")
													   .style("top", (d3.event.pageY - 28) + "px");
												d3.select(this).attr("fill", "white");
											})
											.on("mouseout", function(d) {
													tooltip.transition()
														   .duration(1)
														   .style("opacity", 0);
													d3.select(this).attr("fill", "#FFC600");
											})
											.on("click", function(d) {
												current = d.id;
												clickSelect(current);
												d3.selectAll(".searchText").remove();
												d3.select("#svgInfo").remove();
												d3.select(".selected").classed("selected",false);
												d3.select("#b" + current).classed("selected", true);
												
											});
			
			var blocks_actionsBCF =  blocksBCF.on("mouseover", function(d) {
												tooltip.transition()
													   .duration(10)
													   .style("opacity", 1);
												tooltip.html(d.name)
													   .style("left", (d3.event.pageX) + 15 + "px")
													   .style("top", (d3.event.pageY - 28) + "px");
												d3.select(this).attr("fill", "white");
											})
											.on("mouseout", function(d) {
													tooltip.transition()
														   .duration(1)
														   .style("opacity", 0);
													d3.select(this).attr("fill", "#06aed5");
											})
											.on("click", function(d) {
												current = d.id;
												clickSelect(current);
												d3.selectAll(".searchText").remove();
												d3.select("#svgInfo").remove();
												d3.select(".selected").classed("selected",false);
												d3.select("#b" + current).classed("selected", true);
												
											});								
			var blocks_actionsCDCE =  blocksCDCE.on("mouseover", function(d) {
												tooltip.transition()
													   .duration(10)
													   .style("opacity", 1);
												tooltip.html(d.name)
													   .style("left", (d3.event.pageX) + 15 + "px")
													   .style("top", (d3.event.pageY - 28) + "px");
												d3.select(this).attr("fill", "white");
											})
											.on("mouseout", function(d) {
													tooltip.transition()
														   .duration(1)
														   .style("opacity", 0);
													d3.select(this).attr("fill", "#F10023");
											})
											.on("click", function(d) {
												current = d.id;
												clickSelect(current);
												d3.selectAll(".searchText").remove();
												d3.select("#svgInfo").remove();
												d3.select(".selected").classed("selected",false);
												d3.select("#b" + current).classed("selected", true);
												
											});
		
}

$('.ric').click(function(event) {
		$(this).find("#hidden").slideToggle();
	});
	
function clickSelect(currentRack){
	var ajaxRequest;
	try{
	// Opera 8.0+, Firefox, Safari
		ajaxRequest = new XMLHttpRequest();
	} catch (e){
	// Internet Explorer Browsers
		try{
			ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
		}catch (e) {
			try{
				ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
			}catch (e){
        // Something went wrong
				alert("ajax fail");
				return false;
			}
		}
	}
	ajaxRequest.onreadystatechange = function() {
		if(ajaxRequest.readyState == 4) {
			var ajaxDisplay = document.getElementById('info');
			ajaxDisplay.innerHTML = ajaxRequest.responseText;
		}
	}
	//Clicking on box
	var queryString = "?ID=" + currentRack;
	ajaxRequest.open("GET", "getinfo.php" + queryString, true);
	ajaxRequest.send(null);
}
