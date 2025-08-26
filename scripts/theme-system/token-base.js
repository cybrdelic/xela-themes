// Base (non-HTML) token color templates

export function buildBaseTokens(c){
  return [
    { scope:['comment','punctuation.definition.comment'], settings:{ foreground:c.comment, fontStyle:'italic'}},
    { scope:['keyword'], settings:{ foreground:c.keyword, fontStyle:'bold'}},
    { scope:['entity.name.function'], settings:{ foreground:c.function}},
    { scope:['variable','meta.definition.variable'], settings:{ foreground:c.variable}},
    { scope:['string'], settings:{ foreground:c.string}},
    { scope:['constant.numeric'], settings:{ foreground:c.number}},
    { scope:['constant.language','constant.character'], settings:{ foreground:c.constant}},
    { scope:['storage.type','storage.modifier'], settings:{ foreground:c.storage}},
    { scope:['entity.name.type','support.type','support.class'], settings:{ foreground:c.type}},
    { scope:['punctuation','meta.brace'], settings:{ foreground:c.punctuation}},
    { scope:['invalid','invalid.illegal'], settings:{ foreground:c.invalid, fontStyle:'underline'}},
    { scope:['markup.bold','markup.bold.markdown'], settings:{ fontStyle:'bold', foreground:c.textPrimary}},
    { scope:['markup.italic','markup.italic.markdown'], settings:{ fontStyle:'italic', foreground:c.textPrimary}},
    { scope:['markup.inline.raw','markup.raw.inline','markup.inline.code'], settings:{ foreground:c.code}},
    { scope:['markup.heading','entity.name.section','punctuation.definition.heading.markdown'], settings:{ fontStyle:'bold', foreground:c.heading}},
    { scope:['heading.1.markdown','markup.heading.setext.1.markdown'], settings:{ fontStyle:'bold', foreground:c.h1}},
    { scope:['heading.2.markdown','markup.heading.setext.2.markdown'], settings:{ fontStyle:'bold', foreground:c.h2}},
    { scope:['heading.3.markdown'], settings:{ fontStyle:'bold', foreground:c.h3}},
    { scope:['heading.4.markdown'], settings:{ fontStyle:'bold', foreground:c.h4}},
    { scope:['heading.5.markdown'], settings:{ fontStyle:'bold', foreground:c.h5}},
    { scope:['heading.6.markdown'], settings:{ fontStyle:'bold', foreground:c.h6}},
  ];
}
