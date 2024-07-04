# Anther
Cross-Pollinating Communities of Practice via Video Tutorials
---

![/figures/anther_teaser.png](/figures/anther_teaser.png)

## Abstract
Communities of practice (CoPs) play a crucial role in cross-pollination and learning within various skill-based and craft domains. These communities often share common materials, concepts, and tech- niques across related practices. However, due to their insular nature, exchanging knowledge between CoPs has been challenging, leading to fragmented knowledge marked by difering vocabularies and con- texts. To address this issue, we introduce Anther, a system designed to highlight shared concepts and semantic overlap between distinct CoPs. Anther projects concepts onto a 2-dimensional space, provid- ing users with comprehensive, contextual, and conceptual views. We conducted a user study, demonstrating Anther’s efectiveness in aggregating and disseminating community-based knowledge, bridg- ing gaps between CoPs, and supporting the cross-pollination of knowledge between CoPs. Further, we present interaction vignettes that illustrate how Anther can ease entry into new domains and aide in discovering new creative techniques. This work can beneft maker communities by fostering collaborative knowledge-building across diverse domains.

## What is Anther?
Anther is a Cross-Pollination Creativity Support Tool (CP-CST) that aims to connect communities by exposing the linguistic and semantic similarities between different Communities of Practice. The tool is designed to encourage interdisciplinary collaboration and to help users contextualize their knowledge as they explore new domains.

![/figures/anther_overview.png](/figures/anther_overview.png)

## How does it work?
Anther was built on a dataset of video tutorial transcripts built during our prior research. The tool uses a combination of Natural Language Processing (NLP) techniques to extract concepts and keywords from the transcripts. These concepts are then ranked and projected onto a 2D space. The resulting visualization allows users to explore the semantic relationships between different communities of practice.

## How do I use Anther?
You can explore the live application [here](https://helpful-starship-057962.netlify.app/).

## How do I get in touch?
If you have any questions or feedback, please feel free to reach out to us:
- [Adam G. Emerson](mailto:adam.emerson@mavs.uta.edu)
- [Shreyosi Endow](mailto:shreyosi.endow@mavs.uta.edu)


---

## Known Issues
### "Contextual Quotes" not loading
This can be caused if the materialized table that stores the quotes is empty. If the application is inactive for a number of days, Supabase may "pause" the database instance, which apparently drops the materialized views.

To fix this, simply run the following SQL query in the Supabase SQL editor:
```sql
REFRESH MATERIALIZED VIEW mat_quotes;
```

### "Other Domains" dropdown not populating/loading
This is caused by the same as above, but for the `mat_token_tfpdf` materialized view. 

To fix this, simply run the following SQL query in the Supabase SQL editor:
```sql
REFRESH MATERIALIZED VIEW mat_token_tfpdf;
```