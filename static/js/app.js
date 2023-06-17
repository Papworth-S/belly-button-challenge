// Fetch the JSON data
const jsondata = d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json");

// Read the JSON data
jsondata.then(data => {
  console.log(data);
});

// Function to initialize the dashboard
function init() {
  // Use d3.select and the #selDataset tag to grab the reference for the drop-down
  let dropdownSelector = d3.select("#selDataset");

  // Loop over the names array of the sample JSON to populate the select options
  jsondata.then((data) => {
    data.names.forEach((sample) => {
      dropdownSelector.append("option").text(sample).property("value", sample);
    });

    // Use the first sample name from the JSON list to build the initial plots
    let first = data.names[0];
    buildCharts(first);
    buildMetadata(first);
  });
}

// Function to handle the change in the dropdown selection
function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Function to build the bar and bubble charts
function buildCharts(sample) {
  jsondata.then((data) => {
    // Define some variable that will be called during the creation of the charts
    // First pull the sameple 
    let samples = data.samples;
    // Then create an array that contains only the objects from the samples array where the id matches the provided sample value.
    let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    // and pull out the first element
    let result = resultArray[0];

    // send to console to see what is getting pulled by the above variables
    console.log("Samples:", samples);
    console.log("Result Array:", resultArray);
    console.log("Result:", result);

    // assign varibles from the result element for chart creation 
    let otuIds = result.otu_ids.map(otuId => `OTU ${otuId}`);
    let sampleValues = result.sample_values.slice(0, 10).reverse();
    let otuLabels = result.otu_labels;

  
    // Create the trace for the bar chart
    let barTrace = {
      x: sampleValues,
      y: otuIds,
      text: otuLabels,
      type: "bar",
      orientation: "h"
    };

    // Create the trace for the bubble chart
    let bubbleTrace = {
      x: result.otu_ids,
      y: result.sample_values,
      text: result.otu_labels,
      mode: "markers",
      marker: {
        size: result.sample_values,
        color: result.otu_ids,
        colorscale: "Earth"
      }
    };

    // Define the layout of the bubble chart
    let bubblelayout = {
      title: "Bacteria Samples",
      showlegend: false,
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Sample Values" }
    };

    // Define the layout of the bar chart
    let barlayout = {
      title: "Top 10 OTU",
      showlegend: false,
      xaxis: { title: "Sample Values" },
    };
    
    // Creat an arry that can be called by the Plotly function
    let chartData = [barTrace, bubbleTrace];

    // Plot the bar chart
    console.log("Bar Chart Data:", chartData);
    Plotly.newPlot("bar", [barTrace], barlayout);

    // Plot the bubble chart
    console.log("Bubble Chart Data:", chartData);
    Plotly.newPlot("bubble", [bubbleTrace], bubblelayout);
  });
}


// Function to build the metadata panel
function buildMetadata(sample) {
  jsondata.then((data) => {
    let metadata = data.metadata;
    console.log(metadata);
    let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];
    let panel = d3.select("#sample-metadata");

    panel.html("");

    // Iterate over the metadata entries and display them in the panel
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h5").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

// Initialize the dashboard
init();
