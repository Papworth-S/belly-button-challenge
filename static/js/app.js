const jsondata = d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")

//reading in the json from the url
jsondata.then(data => {
    console.log(data)
});

function init() {
    // use d3.select and the id # tag to grab the reference for the drop down
    let dropdown_selector = d3.select("#selDataset");
    
    // Loop over the name array of the sample json to populate the select options
    jsondata.then((data) => {
        data.names.forEach((sample) => {
            dropdown_selector.append("option").text(sample).property("value", sample);
      });
    
      // Used the first sample name from the json list to build the initial plots
      let first = data.names[0];
      //buildCharts(first);
      buildMetadata(first);
    });
    }



function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    //buildCharts(newSample);
    buildMetadata(newSample);
}

function buildMetadata(sample) {
    jsondata.then((data) => {
      let metadata = data.metadata;
      console.log(metadata);
      // Filter the data for the object with the desired sample number
      let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      let result = resultArray[0];
      // Use d3 to select the panel with id of `sample-metadata`
      let panel = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      panel.html("");
  
      Object.entries(result).forEach(([key, value]) => {
        panel.append("h5").text(`${key.toUpperCase()}: ${value}`);
      });
  
    });
}

// Initialize the dashboard
init();