import { Container, Table, Title } from "@mantine/core";
// 'candle making'
// class
// n/a          60
// technique    34
// material     30
// tool         26
// dtype: int64
//
//
// 'slip casting'
// class
// n/a          68
// technique    44
// material     23
// tool         15
// dtype: int64
//
//
// 'metal casting'
// class
// n/a          69
// technique    38
// material     24
// tool         19
// dtype: int64
//
//
// 'soap making'
// class
// n/a          77
// technique    32
// material     28
// tool         13
// dtype: int64
//
//
// 'slab'
// class
// n/a          56
// technique    42
// tool         27
// material     25
// dtype: int64
//
//
// 'throwing'
// class
// n/a          57
// technique    52
// material     22
// tool         19
// dtype: int64
//
//
// 'glass blowing'
// class
// n/a          56
// technique    50
// tool         25
// material     19
// dtype: int64
//
//
// 'sugar working'
// class
// n/a          48
// technique    41
// material     37
// tool         24
// dtype: int64
//
//
// 'coiling'
// class
// n/a          69
// technique    49
// tool         18
// material     14
// dtype: int64
//
//
// 'knitting'
// class
// n/a          68
// technique    53
// material     18
// tool         11
// dtype: int64
//
//
// 'crochet'
// class
// technique    77
// n/a          61
// material      7
// tool          5
// dtype: int64
//
//
// 'weaving'
// class
// n/a          67
// technique    46
// material     20
// tool         17
// dtype: int64
//
//
// 'embroidery'
// class
// n/a          55
// technique    55
// material     27
// tool         13
// dtype: int64
//
//
// 'carving'
// class
// n/a          82
// technique    40
// tool         15
// material     13
// dtype: int64
//
//
// 'whittling'
// class
// n/a          93
// technique    29
// material     18
// tool         10
// dtype: int64
//
//
// 'turning'
// class
// n/a          73
// technique    43
// tool         24
// material     10
// dtype: int64
//
//
// 'pinch pottery'
// class
// n/a          64
// technique    50
// material     21
// tool         15
// dtype: int64
//
//
// 'epoxy'
// class
// n/a          73
// technique    37
// material     26
// tool         14
// dtype: int64
//
//
// 'glass fusion'
// class
// material     49
// n/a          47
// technique    32
// tool         22
// dtype: int64
//
//
// 'laser cutting'
// class
// n/a          56
// technique    52
// tool         25
// material     17
// dtype: int64
//
//
// '3d printing'
// class
// n/a          62
// technique    45
// tool         23
// material     20
// dtype: int64
//
//
// 'screen printing'
// class
// n/a          52
// technique    46
// tool         27
// material     25
// dtype: int64
//
//
// 'block printing'
// class
// n/a          49
// technique    44
// material     35
// tool         22
// dtype: int64
//
//
// 'coding'
// class
// n/a          50
// material     37
// tool         34
// technique    29
// dtype: int64
//
//
// 'makeup'
// class
// n/a          78
// material     34
// technique    28
// tool         10
// dtype: int64

interface TableRow {
  cop: string;
  numVideos: number;
  numConcepts: number;
  avgDuration: number;
  steDuration: number;
  searchTerms: string[];
  mat: number;
  tool: number;
  technique: number;
  na: number;
}

function TablePage() {
  const data: TableRow[] = [
    {
      cop: "Makeup",
      numVideos: 84,
      numConcepts: 3565,
      avgDuration: 910.57,
      steDuration: 59.97,
      mat: 34,
      tool: 10,
      technique: 28,
      na: 78,
      searchTerms: ["makeup tutorial"],
    },
    {
      cop: "Sugar Working",
      numVideos: 89,
      numConcepts: 2301,
      avgDuration: 374.17,
      steDuration: 40.19,
      mat: 37,
      tool: 24,
      technique: 41,
      na: 48,
      searchTerms: [
        "glass sugar working tutorial",
        "glass sugar blowing tutorial",
      ],
    },
    {
      cop: "3D Printing",
      numVideos: 90,
      numConcepts: 3729,
      avgDuration: 556.91,
      steDuration: 49.62,
      mat: 20,
      tool: 23,
      technique: 45,
      na: 62,
      searchTerms: ["3d printing tutorial"],
    },
    {
      cop: "Laser Cutting",
      numVideos: 78,
      numConcepts: 3385,
      avgDuration: 696.27,
      steDuration: 47.68,
      mat: 17,
      tool: 25,
      technique: 52,
      na: 56,
      searchTerms: ["laser cutting tutorial"],
    },
    {
      cop: "Slip Casting",
      numVideos: 57,
      numConcepts: 2310,
      avgDuration: 503.93,
      steDuration: 69.44,
      mat: 23,
      tool: 15,
      technique: 44,
      na: 68,
      searchTerms: ["slip casting tutorials"],
    },
    {
      cop: "Pinch Pottery",
      numVideos: 69,
      numConcepts: 2445,
      avgDuration: 721.81,
      steDuration: 83.11,
      mat: 21,
      tool: 15,
      technique: 50,
      na: 64,
      searchTerms: ["pinch pottery tutorial"],
    },
    {
      cop: "Slab Building",
      numVideos: 66,
      numConcepts: 2296,
      avgDuration: 800.18,
      steDuration: 98.35,
      mat: 25,
      tool: 27,
      technique: 42,
      na: 56,
      searchTerms: ["clay slab building tutorial"],
    },
    {
      cop: "Coiling",
      numVideos: 72,
      numConcepts: 2294,
      avgDuration: 710.62,
      steDuration: 61.98,
      mat: 14,
      tool: 18,
      technique: 49,
      na: 69,
      searchTerms: ["clay coiling tutorial"],
    },
    {
      cop: "Throwing",
      numVideos: 68,
      numConcepts: 2547,
      avgDuration: 645.4,
      steDuration: 80.91,
      mat: 22,
      tool: 19,
      technique: 52,
      na: 57,
      searchTerms: ["clay throwing tutorial"],
    },
    {
      cop: "Embroidery",
      numVideos: 74,
      numConcepts: 2289,
      avgDuration: 630.22,
      steDuration: 82.94,
      mat: 27,
      tool: 13,
      technique: 55,
      na: 55,
      searchTerms: ["embroidery tutorial", "how to do embroidery"],
    },
    {
      cop: "Knitting",
      numVideos: 82,
      numConcepts: 2785,
      avgDuration: 1204.79,
      steDuration: 139.73,
      mat: 18,
      tool: 11,
      technique: 53,
      na: 68,
      searchTerms: ["knitting tutorials"],
    },
    {
      cop: "Crochet",
      numVideos: 79,
      numConcepts: 1623,
      avgDuration: 680.55,
      steDuration: 100.92,
      mat: 7,
      tool: 5,
      technique: 77,
      na: 61,
      searchTerms: ["crocheting tutorials"],
    },
    {
      cop: "Weaving",
      numVideos: 74,
      numConcepts: 2548,
      avgDuration: 811.51,
      steDuration: 81.38,
      mat: 20,
      tool: 17,
      technique: 46,
      na: 67,
      searchTerms: ["weaving tutorial"],
    },
    {
      cop: "Screen Printing",
      numVideos: 71,
      numConcepts: 3069,
      avgDuration: 776.89,
      steDuration: 102.09,
      mat: 25,
      tool: 27,
      technique: 46,
      na: 52,
      searchTerms: ["screen printing tutorial"],
    },
    {
      cop: "Block Printing",
      numVideos: 54,
      numConcepts: 2389,
      avgDuration: 598.69,
      steDuration: 85.87,
      mat: 35,
      tool: 22,
      technique: 44,
      na: 49,
      searchTerms: ["block printing tutorial"],
    },
    {
      cop: "Coding",
      numVideos: 62,
      numConcepts: 5268,
      avgDuration: 5129.89,
      steDuration: 1209.51,
      mat: 37,
      tool: 34,
      technique: 29,
      na: 50,
      searchTerms: ["coding tutorial"],
    },
    {
      cop: "Carving",
      numVideos: 57,
      numConcepts: 2722,
      avgDuration: 1126.36,
      steDuration: 133.18,
      mat: 13,
      tool: 15,
      technique: 40,
      na: 82,
      searchTerms: ["wood carving tutorial"],
    },
    {
      cop: "Whittling",
      numVideos: 80,
      numConcepts: 2893,
      avgDuration: 1171.0,
      steDuration: 121.69,
      mat: 18,
      tool: 10,
      technique: 29,
      na: 93,
      searchTerms: ["whittling tutorial"],
    },
    {
      cop: "Wood Turning",
      numVideos: 68,
      numConcepts: 3334,
      avgDuration: 1008.38,
      steDuration: 139.86,
      mat: 10,
      tool: 24,
      technique: 43,
      na: 73,
      searchTerms: ["wood turning tutorial"],
    },
    {
      cop: "Epoxy Casting",
      numVideos: 61,
      numConcepts: 2518,
      avgDuration: 582.57,
      steDuration: 62.95,
      mat: 26,
      tool: 14,
      technique: 37,
      na: 73,
      searchTerms: ["wood epoxy tutorial"],
    },
    {
      cop: "Glass Blowing",
      numVideos: 62,
      numConcepts: 2312,
      avgDuration: 455.62,
      steDuration: 73.68,
      mat: 19,
      tool: 25,
      technique: 50,
      na: 56,
      searchTerms: ["glass blowing tutorial"],
    },
    {
      cop: "Glass Fusion",
      numVideos: 77,
      numConcepts: 3199,
      avgDuration: 837.79,
      steDuration: 90.36,
      mat: 49,
      tool: 22,
      technique: 32,
      na: 47,
      searchTerms: ["glass fusing tutorial"],
    },
    {
      cop: "Metal Casting",
      numVideos: 69,
      numConcepts: 3642,
      avgDuration: 688.25,
      steDuration: 45.42,
      mat: 24,
      tool: 19,
      technique: 38,
      na: 69,
      searchTerms: ["metal casting tutorials"],
    },
    {
      cop: "Candle Making",
      numVideos: 80,
      numConcepts: 2994,
      avgDuration: 630.3,
      steDuration: 61.34,
      mat: 30,
      tool: 26,
      technique: 34,
      na: 60,
      searchTerms: ["candle making tutorials"],
    },
    {
      cop: "Soap Making",
      numVideos: 83,
      numConcepts: 3429,
      avgDuration: 999.43,
      steDuration: 56.22,
      mat: 28,
      tool: 13,
      technique: 32,
      na: 77,
      searchTerms: ["soap making tutorials"],
    },
  ];

  // Function to round to two decimal places
  const round = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;

  const rows = data
    .sort((a, b) => (a.cop[0] < b.cop[0] ? -1 : 1))
    .map((row) => (
      <tr key={row.cop}>
        <td>{row.cop}</td>
        <td style={{ textAlign: "center" }}>{row.numVideos}</td>
        <td style={{ textAlign: "center" }}>{row.numConcepts}</td>
        <td>{`${round(row.avgDuration / 60)} ± ${round(
          row.steDuration / 60,
        )}`}</td>
        {/*<td>{row.searchTerms.map((term) => `"${term}"`).join(", ")}</td>*/}
        <td>
          <span style={{ color: "red" }}>{row.mat}</span> /{" "}
          <span style={{ color: "green" }}>{row.tool}</span> /{" "}
          <span style={{ color: "blue" }}>{row.technique}</span> /{" "}
          <span style={{ color: "grey" }}>{row.na}</span>
        </td>
      </tr>
    ));

  return (
    <Container>
      <Title size={"h3"}>Corpus Table</Title>
      <Title size={"h5"} color={"dimmed"} ff={"Nunito"}>
        The Dataset
      </Title>

      <Table striped withColumnBorders withBorder m={"md"} color={"blue"}>
        <thead style={{ backgroundColor: "#f0f0f0" }}>
          <tr key={"total"}>
            <th style={{ width: "240px" }}>Community of Practice (CoP)</th>
            <th style={{ width: "120px" }}># Videos</th>
            <th style={{ width: "120px" }}># Concepts</th>
            <th style={{ width: "240px" }}>Avg. Duration ± STE (min)</th>
            <th>Mat. / Tool / Tech. / Other</th>
          </tr>
        </thead>
        <tbody>
          {rows}
          <tr>
            <td>
              <b>TOTAL</b>
            </td>
            <td style={{ textAlign: "center" }}>
              <b>1806</b>
            </td>
            <td style={{ textAlign: "center" }}>
              <b>71886</b>
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default TablePage;
