export default function replaceImagePlugin(md) {
  const defaultRender = md.renderer.rules.image || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.image = function(tokens, idx, options, env, self) {
    const token = tokens[idx];
    const src = token.attrs[token.attrIndex('src')][1];
    const alt = token.content;

    return `<n-image class="markdown-img" style="margin: auto;width: 100%;justify-content: center;" lazy src="${src}" >${alt}</n-image>`;
  };
}