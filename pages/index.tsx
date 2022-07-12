import React, { useState } from "react";
import { remark } from "remark";
import linkText from "@double-great/remark-lint-link-text";
import altText from "@double-great/remark-lint-alt-text";
import { reporter } from "vfile-reporter";
import dynamic from "next/dynamic";
import Head from "next/head";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

const CodeWithCodemirror = dynamic(import("../components/code"), {
  ssr: false,
});

const Playground = () => {
  const [errors, setErrors] = useState("");
  const [preview, setPreview] = useState("");

  function handleChange(value: string) {
    const toMd = unified().use(remarkParse).use(remarkHtml).processSync(value);

    setPreview(String(toMd));
    const file = remark().use(linkText).use(altText).processSync(value);
    setErrors(reporter(file));
  }

  return (
    <>
      <Head>
        <title>Playground | Double Great</title>
      </Head>
      <div className="grid-container">
        <div className="grid-left">
          <CodeWithCodemirror
            value={`# Double Great playground

*Copy and paste your markdown here to test each plugin.*

remark-lint-link-text warns against non-descriptive link text. Examples: 
- [click here](https://double-great.dev/)
- [read more](https://double-great.dev/remark-lint-link-text)

remark-lint-alt-text warns against unhelpful or missing image alt text. Example: ![](chart.png)
`}
            handleChange={handleChange}
          />
        </div>
        <div className="grid-right">
          <div
            className="preview-wrapper"
            dangerouslySetInnerHTML={{ __html: preview }}
          ></div>
        </div>
      </div>
      <div className="error-wrapper">
        {errors ? <pre>{errors}</pre> : `no issues found`}
      </div>
    </>
  );
};

export default Playground;
