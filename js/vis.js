console.log("hehe");

async function fetchData() {
  // Load your CSV file
  const data = await d3.csv("dataset/videogames_wide.csv");
  return data;
}

fetchData().then(async (data) => {
    // Chart One
    const genreChart = vl
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
    .height(400)
    .title("Global Sales by Genre");

    const platformChart = vl
        .markBar()
        .data(data)
        .encode(
        vl.x().fieldN("Platform").title("Platform"),
        vl.y().fieldQ("Global_Sales").aggregate("sum").title("Total Global Sales (in millions)"),
        vl.color().fieldN("Platform"),
        vl.tooltip([
            vl.fieldN("Platform"),
            vl.fieldQ("Global_Sales")
        ])
        )
        .width(600)
        .height(400)
        .title("Global Sales by Platform");  

    // Combine Charts
    const vconcatSpec = vl
        .vconcat(genreChart, platformChart)
        .spacing(80) 
        .toSpec();   

    // v2
    const vlSpec2 = vl
        .markLine({point: true})
        .data(data)
        .encode(
            vl.x().fieldO('Year').title('Year of Release'),
            vl.y().sum('Global_Sales').title('Total Global Sales'),
            vl.color().fieldN('Platform').scale({scheme: "category20"}),
            vl.tooltip(['Year', 'Platform', 'sum(Global_Sales)'])
        )
        .width(700)
        .height(400)
        .title("Sales Over Time by Platform")
        .toSpec();

    // v2
    const vlSpec3 = vl
        .markArea({point: true})
        .data(data)
        .encode(
            vl.x().fieldO('Year').title('Year of Release'),
            vl.y().sum('Global_Sales').title('Total Global Sales (in millions)'),
            vl.color().fieldN('Genre').scale({scheme: "category20"})
        ).width(700)
        .height(400)
        .title("Sales Over Time by Genre")
        .toSpec();

    // Chart 1 — NA Sales by Platform
    const naChart = vl
        .markBar()
        .data(data)
        .encode(
        vl.x().fieldN("Platform").title("Platform"),
        vl.y().fieldQ("NA_Sales").aggregate("sum").title("Sales (in millions)"),
        vl.color().fieldN("Platform"),
        vl.tooltip(["Platform", "NA_Sales"])
        )
        .width(600)
        .height(400)
        .title("NA Sales by Platform");

    // Chart 2 — EU Sales by Platform
    const euChart = vl
        .markBar()
        .data(data)
        .encode(
        vl.x().fieldN("Platform").title("Platform"),
        vl.y().fieldQ("EU_Sales").aggregate("sum").title("Sales (in millions)"),
        vl.color().fieldN("Platform"),
        vl.tooltip(["Platform", "EU_Sales"])
        )
        .width(600)
        .height(400)
        .title("EU Sales by Platform");

    // Chart 3 — JP Sales by Platform
    const jpChart = vl
        .markBar()
        .data(data)
        .encode(
        vl.x().fieldN("Platform").title("Platform"),
        vl.y().fieldQ("JP_Sales").aggregate("sum").title("Sales (in millions)"),
        vl.color().fieldN("Platform"),
        vl.tooltip(["Platform", "JP_Sales"])
        )
        .width(600)
        .height(400)
        .title("JP Sales by Platform");

    // Chart 4 — Other Sales by Platform
    const otherChart = vl
        .markBar()
        .data(data)
        .encode(
        vl.x().fieldN("Platform").title("Platform"),
        vl.y().fieldQ("Other_Sales").aggregate("sum").title("Sales (in millions)"),
        vl.color().fieldN("Platform"),
        vl.tooltip(["Platform", "Other_Sales"])
        )
        .width(600)
        .height(400)
        .title("Other Sales by Platform");

    // Combine the four vertically
    const vconcatSpec4 = vl
        .vconcat(naChart, euChart, jpChart, otherChart)
        .spacing(80)
        .toSpec();

    const vlSpec5 = vl
        .markBar()
        .data(data)
        .transform(
            vl.fold(["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"]).as(["Region", "Sales"]),
        )
        .encode(
            vl.x().fieldN("Genre").title("Genre"),
            vl.y().fieldQ("Sales").aggregate("sum").title("Sales (M)"),
            vl.color().fieldN("Region").title("Region"),
            vl.tooltip([
            vl.fieldN("Genre"),
            vl.fieldN("Region"),
            vl.fieldQ("Sales")
            ])
        )
        .width(700)
        .height(450)
        .title("Genre Performance by Region")
        .toSpec();


    render("#view", vconcatSpec);
    render("#view2", vlSpec2);
    render("#view3", vlSpec3);
    render("#view4", vconcatSpec4);
    render("#view4", vlSpec5);

});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}





