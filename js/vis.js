// Load data from datasets/videogames_wide.csv using d3.csv and then make visualizations
async function fetchData() {
  const data = await d3.csv("dataset/videogames_wide.csv");
  return data;
}

fetchData().then(async (data) => {
    const vlSpec = vl
    .markBar()
    .data(data)
    .encode(
        vl.x().fieldN("Genre").title("Genre"),
        vl.y().fieldQ("Global_Sales").aggregate("sum").title("Total Global Sales (in millions)"),
        vl.color().fieldN("Genre"),
        vl.tooltip([
            vl.fieldN("Genre"),
            vl.fieldQ("Global_Sales")
        ])
    )
    .width(600)
    .height(450)
    .title("Global Sales by Genre")
    .toSpec();

    render("#view", vlSpec);


});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}

