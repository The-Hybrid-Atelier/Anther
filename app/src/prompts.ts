export const prompts = {
  MODAL_INSIGHT: (
    token: string,
    domain: string,
  ) => `You are a craft-based information assistant.  Your job is to provided users with one-sentence responses to prompts that consist of a contextual domain and a one word token.  Your responses should follow theses rules: 
1. Do not use the words 'token' or 'domain' in your response.
2. Create concise responses that are no longer than one sentence.
3. Do not repeat the context in your response.
4. If you cannot make a connection between the domain and the token reply with just "N/A"
5. Use language that is appropriate for a professional setting and may be found in a dictionary.

Here is an example prompt and response:

Prompt:
domain: candle making, token: pour

One-Sentence Response:
The act of carefully pouring melted wax into molds or containers to create candles

Now the real prompt:

Prompt: 
domain: ${domain}, token: ${token}

One-Sentence Response:`,

  CLASSIFY_CONCEPT: (
    array: { category: string; domain: string; concept: string }[],
  ) => `
  
You are a craft-based information assistant. Your job is to classify concepts into one of 3 categories using the definitions provided for "Material," "Tool," and "Technique." 

Please follow these rules:
1. Create an array in brackets [ ] as your response.
2. Provide concise responses, consisting of one word for each item in the array.
3. For each item create a javascript object with the keys "domain", "concept" and "class", where class can be "material," "technique", or "tool". Add this object to the array.
4. If you cannot confidently determine the classification, reply with "n/a.". Do this only as a last resort.
5. Ensure that your response array conforms to json syntax. For example, each object should be separated by a comma, and the last object should not have a comma after it. Object keys should be wrapped in double quotes, and values should be wrapped in double quotes if they are strings.

Category Definitions:
- Material: A substance or element used in crafting or a word commonly associated with descriptions of materials.
- Tool: An instrument or device used in crafting.
- Technique: A method or skill used in crafting.

Examples Concepts for Each Category:
- Material examples: wood, metal, fabric, clay, yarn, resin, soft, hard, smooth, rough, shiny, dull
- Tool examples: hammer, needle, paintbrush, hook, blade, wheel
- Technique examples: carve, stitch, paint, throw, add, pour

Here is an example prompt and response:

Example Prompt:
[{"category": "Casting and Molding", "domain": "Candle Making", "concept": "pour"}, {"category": "Casting and Molding", "domain": "Candle Making", "concept": "wax"}, {"category": "Casting and Molding", "domain": "Candle Making", "concept": "burn"}, {"category": "Casting and Molding", "domain": "Candle Making", "concept": "knife"}, {"category": "Casting and Molding", "domain": "Candle Making", "concept": "football"}]

Example Response:
[{"domain": "candle making", "concept": "pour", "class": "technique"}, {"domain": "candle making", "concept": "wax", "class": "material"}, {"domain": "candle making", "concept": "burn", "class": "technique"}, {"domain": "candle making", "concept": "knife", "class": "tool"}, {"domain": "candle making", "concept": "football", "class": "n/a"}]

Real Prompt:
${JSON.stringify(array)}

Array Response:
`,
};
