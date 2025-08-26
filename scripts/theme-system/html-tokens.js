// HTML token generation (refactored from enhance-html-tokens)

export function getHtmlColorScheme(themeId, type){
  const id = themeId.toLowerCase();
  const isDark = type === 'dark';
  if(/matrix/.test(id)){
    return {
      htmlTag: '#72FFD4', htmlStructureTag: '#00FF88', htmlInlineTag: '#4DFFAA', htmlScriptTag: '#FF6B6B',
      htmlAttribute: '#FFE66D', htmlClassAttribute: '#FF8E53', htmlIdAttribute: '#4ECDC4', htmlStyleAttribute: '#FF6B9D', htmlEventAttribute: '#C7CEEA',
      htmlAttributeValue: '#A8E6CF', htmlAttributeValueString: '#B8F2E6', htmlTagBrackets: '#5A5A5A', htmlPunctuation: '#666666', htmlStringPunctuation: '#888888', htmlComment: '#4A6741', htmlEntity: '#FFD93D', htmlEntityPunctuation: '#FFA726', htmlDoctype: '#9C27B0', embeddedCss: '#E1BEE7', embeddedCssBlock: '#F3E5F5', embeddedJs: '#FFF9C4', embeddedJsBlock: '#F0F4C3', htmlFormTag: '#81C784', htmlFormAttribute: '#AED581', htmlTableTag: '#64B5F6', htmlMediaTag: '#FFB74D', htmlLinkTag: '#4FC3F7', htmlHrefAttribute: '#29B6F6', htmlSemanticTag: '#BA68C8', htmlText: '#E0E0E0'
    };
  }
  if(/night-vision/.test(id)){
    return {
      htmlTag: '#FFD166', htmlStructureTag: '#FF8C42', htmlInlineTag: '#FFA726', htmlScriptTag: '#FF5722', htmlAttribute: '#C6F7C6', htmlClassAttribute: '#A5D6A7', htmlIdAttribute: '#81C784', htmlStyleAttribute: '#66BB6A', htmlEventAttribute: '#4CAF50', htmlAttributeValue: '#FFECB3', htmlAttributeValueString: '#FFF9C4', htmlTagBrackets: '#795548', htmlPunctuation: '#8D6E63', htmlStringPunctuation: '#A1887F', htmlComment: '#6D4C41', htmlEntity: '#FFAB40', htmlEntityPunctuation: '#FF9800', htmlDoctype: '#D32F2F', embeddedCss: '#E1BEE7', embeddedCssBlock: '#F3E5F5', embeddedJs: '#FFF9C4', embeddedJsBlock: '#F0F4C3', htmlFormTag: '#8BC34A', htmlFormAttribute: '#9CCC65', htmlTableTag: '#42A5F5', htmlMediaTag: '#FFA726', htmlLinkTag: '#29B6F6', htmlHrefAttribute: '#0288D1', htmlSemanticTag: '#AB47BC', htmlText: '#F5F5F5'
    };
  }
  if(/black|amoled/.test(id)){
    return {
      htmlTag: '#F7B883', htmlStructureTag: '#FFD166', htmlInlineTag: '#EADCB2', htmlScriptTag: '#FF3CAC', htmlAttribute: '#EADCB2', htmlClassAttribute: '#C8B0FF', htmlIdAttribute: '#4CFFCA', htmlStyleAttribute: '#FF8BDA', htmlEventAttribute: '#D8C8FF', htmlAttributeValue: '#00F5A0', htmlAttributeValueString: '#98FF66', htmlTagBrackets: '#A6AAB4', htmlPunctuation: '#8E93A6', htmlStringPunctuation: '#9AA0B4', htmlComment: '#8E93A6', htmlEntity: '#F2C97D', htmlEntityPunctuation: '#FFD166', htmlDoctype: '#FF3CAC', embeddedCss: '#E0CCFF', embeddedCssBlock: '#D7C7FF', embeddedJs: '#F7B883', embeddedJsBlock: '#EADCB2', htmlFormTag: '#79E49A', htmlFormAttribute: '#98FF66', htmlTableTag: '#4CFFCA', htmlMediaTag: '#FFD166', htmlLinkTag: '#4CFFCA', htmlHrefAttribute: '#00F5A0', htmlSemanticTag: '#C8B0FF', htmlText: '#F7F8FA'
    };
  }
  if(/arctic|ink|graph/.test(id)){
    return {
      htmlTag: '#D84315', htmlStructureTag: '#BF360C', htmlInlineTag: '#FF5722', htmlScriptTag: '#E91E63', htmlAttribute: '#1976D2', htmlClassAttribute: '#303F9F', htmlIdAttribute: '#0288D1', htmlStyleAttribute: '#7B1FA2', htmlEventAttribute: '#512DA8', htmlAttributeValue: '#2E7D32', htmlAttributeValueString: '#388E3C', htmlTagBrackets: '#616161', htmlPunctuation: '#757575', htmlStringPunctuation: '#424242', htmlComment: '#9E9E9E', htmlEntity: '#F57C00', htmlEntityPunctuation: '#FF9800', htmlDoctype: '#C62828', embeddedCss: '#4A148C', embeddedCssBlock: '#6A1B9A', embeddedJs: '#E65100', embeddedJsBlock: '#F57C00', htmlFormTag: '#1B5E20', htmlFormAttribute: '#2E7D32', htmlTableTag: '#0D47A1', htmlMediaTag: '#E65100', htmlLinkTag: '#01579B', htmlHrefAttribute: '#0277BD', htmlSemanticTag: '#4A148C', htmlText: '#212121'
    };
  }
  // default dark
  return {
    htmlTag: '#F7B883', htmlStructureTag: '#FFD166', htmlInlineTag: '#EADCB2', htmlScriptTag: '#FF3CAC', htmlAttribute: '#EADCB2', htmlClassAttribute: '#C8B0FF', htmlIdAttribute: '#4CFFCA', htmlStyleAttribute: '#FF8BDA', htmlEventAttribute: '#D8C8FF', htmlAttributeValue: '#00F5A0', htmlAttributeValueString: '#98FF66', htmlTagBrackets: '#A6AAB4', htmlPunctuation: '#8E93A6', htmlStringPunctuation: '#9AA0B4', htmlComment: '#8E93A6', htmlEntity: '#F2C97D', htmlEntityPunctuation: '#FFD166', htmlDoctype: '#FF3CAC', embeddedCss: '#E0CCFF', embeddedCssBlock: '#D7C7FF', embeddedJs: '#F7B883', embeddedJsBlock: '#EADCB2', htmlFormTag: '#79E49A', htmlFormAttribute: '#98FF66', htmlTableTag: '#4CFFCA', htmlMediaTag: '#FFD166', htmlLinkTag: '#4CFFCA', htmlHrefAttribute: '#00F5A0', htmlSemanticTag: '#C8B0FF', htmlText: '#F7F8FA'
  };
}

export function getEnhancedHtmlTokens(s){
  return [
    { scope:['entity.name.tag.html','entity.name.tag.xml'], settings:{ foreground:s.htmlTag, fontStyle:'bold'}},
    { scope:['entity.name.tag.structure.any.html','entity.name.tag.block.any.html'], settings:{ foreground:s.htmlStructureTag, fontStyle:'bold'}},
    { scope:['entity.name.tag.inline.any.html'], settings:{ foreground:s.htmlInlineTag }},
    { scope:['entity.name.tag.script.html','entity.name.tag.style.html'], settings:{ foreground:s.htmlScriptTag, fontStyle:'bold'}},
    { scope:['entity.other.attribute-name.html','entity.other.attribute-name.xml'], settings:{ foreground:s.htmlAttribute, fontStyle:'italic'}},
    { scope:['entity.other.attribute-name.class.html','entity.other.attribute-name.class.css'], settings:{ foreground:s.htmlClassAttribute, fontStyle:'italic bold'}},
    { scope:['entity.other.attribute-name.id.html','entity.other.attribute-name.id.css'], settings:{ foreground:s.htmlIdAttribute, fontStyle:'italic bold'}},
    { scope:['entity.other.attribute-name.style.html'], settings:{ foreground:s.htmlStyleAttribute, fontStyle:'italic'}},
    { scope:['entity.other.attribute-name.event.html'], settings:{ foreground:s.htmlEventAttribute, fontStyle:'italic'}},
    { scope:['string.quoted.double.html','string.quoted.single.html'], settings:{ foreground:s.htmlAttributeValue}},
    { scope:['meta.attribute-with-value.html string'], settings:{ foreground:s.htmlAttributeValueString}},
    { scope:['punctuation.definition.tag.begin.html','punctuation.definition.tag.end.html'], settings:{ foreground:s.htmlTagBrackets}},
    { scope:['punctuation.definition.tag.html','punctuation.separator.key-value.html'], settings:{ foreground:s.htmlPunctuation}},
    { scope:['punctuation.definition.string.begin.html','punctuation.definition.string.end.html'], settings:{ foreground:s.htmlStringPunctuation}},
    { scope:['comment.block.html','punctuation.definition.comment.html'], settings:{ foreground:s.htmlComment, fontStyle:'italic'}},
    { scope:['constant.character.entity.html','constant.character.entity.named.html'], settings:{ foreground:s.htmlEntity, fontStyle:'bold'}},
    { scope:['punctuation.definition.entity.html'], settings:{ foreground:s.htmlEntityPunctuation}},
    { scope:['meta.tag.sgml.doctype.html','entity.name.tag.doctype.html'], settings:{ foreground:s.htmlDoctype, fontStyle:'bold'}},
    { scope:['keyword.doctype.xml'], settings:{ foreground:s.htmlDoctype, fontStyle:'bold'}},
    { scope:['source.css.embedded.html'], settings:{ foreground:s.embeddedCss}},
    { scope:['meta.embedded.block.css'], settings:{ foreground:s.embeddedCssBlock}},
    { scope:['source.js.embedded.html','source.javascript.embedded.html'], settings:{ foreground:s.embeddedJs}},
    { scope:['meta.embedded.block.javascript'], settings:{ foreground:s.embeddedJsBlock}},
    { scope:['entity.name.tag.form.html','entity.name.tag.input.html','entity.name.tag.button.html'], settings:{ foreground:s.htmlFormTag, fontStyle:'bold'}},
    { scope:['entity.other.attribute-name.form.html'], settings:{ foreground:s.htmlFormAttribute, fontStyle:'italic'}},
    { scope:['entity.name.tag.table.html','entity.name.tag.tr.html','entity.name.tag.td.html','entity.name.tag.th.html'], settings:{ foreground:s.htmlTableTag, fontStyle:'bold'}},
    { scope:['entity.name.tag.img.html','entity.name.tag.video.html','entity.name.tag.audio.html'], settings:{ foreground:s.htmlMediaTag, fontStyle:'bold'}},
    { scope:['entity.name.tag.a.html'], settings:{ foreground:s.htmlLinkTag, fontStyle:'bold'}},
    { scope:['entity.other.attribute-name.href.html'], settings:{ foreground:s.htmlHrefAttribute, fontStyle:'italic bold'}},
    { scope:['entity.name.tag.header.html','entity.name.tag.main.html','entity.name.tag.footer.html','entity.name.tag.nav.html','entity.name.tag.aside.html','entity.name.tag.section.html','entity.name.tag.article.html','entity.name.tag.figure.html','entity.name.tag.figcaption.html'], settings:{ foreground:s.htmlSemanticTag, fontStyle:'bold'}},
    { scope:['text.html.basic'], settings:{ foreground:s.htmlText}}
  ];
}
