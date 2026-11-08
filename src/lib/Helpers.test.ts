import { describe, expect, it } from 'vitest';
import {
  excerpt,
  extractFirstImage,
  parseCategory,
  parseContent,
  parsePage,
  readingTime,
  toPlainText,
} from './Helpers';

describe('parseContent', () => {
  it('decodes JSON-encoded HTML as stored by createPost', () => {
    expect(parseContent(JSON.stringify('<p>Hi "you"</p>'))).toBe(
      '<p>Hi "you"</p>',
    );
  });

  it('falls back to the raw value when it is not JSON', () => {
    expect(parseContent('<p>raw</p>')).toBe('<p>raw</p>');
  });

  it('turns the &nbsp; Quill 2 puts between every word back into spaces', () => {
    const quill2 =
      '<p>The&nbsp;anger&nbsp;is&nbsp;not&#160;irrational.\u00a0Yes</p>';
    expect(parseContent(JSON.stringify(quill2))).toBe(
      '<p>The anger is not irrational. Yes</p>',
    );
  });
});

describe('toPlainText / excerpt', () => {
  it('strips tags, decodes entities and collapses whitespace', () => {
    expect(toPlainText('<h1>Title</h1><p>a&nbsp;&amp;&#39;b&#x21;</p>')).toBe(
      "Title a &'b!",
    );
  });

  it('truncates long text with an ellipsis', () => {
    expect(excerpt('<p>hello world</p>', 5)).toBe('hello...');
    expect(excerpt('<p>short</p>', 50)).toBe('short');
  });
});

describe('readingTime', () => {
  it('is at least one minute and counts words, not markup', () => {
    expect(readingTime('<p>one two</p>')).toBe(1);
    expect(readingTime(`<p>${'word '.repeat(401)}</p>`)).toBe(3);
  });
});

describe('extractFirstImage', () => {
  it('returns the first image src', () => {
    expect(extractFirstImage('<p><img src="a.png"><img src="b.png"></p>')).toBe(
      'a.png',
    );
    expect(extractFirstImage('<p>none</p>')).toBeUndefined();
  });
});

describe('query param parsing', () => {
  it('accepts only known categories', () => {
    expect(parseCategory('Tech')).toBe('Tech');
    expect(parseCategory('tech')).toBeUndefined();
    expect(parseCategory(undefined)).toBeUndefined();
  });

  it('falls back to page 1 for invalid pages', () => {
    expect(parsePage('3')).toBe(3);
    expect(parsePage('0')).toBe(1);
    expect(parsePage('abc')).toBe(1);
    expect(parsePage(['2', '3'])).toBe(1);
  });
});
