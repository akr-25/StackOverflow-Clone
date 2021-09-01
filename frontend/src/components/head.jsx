import React from "react";

const Head = () => {
  return (
    <div>
      <meta charSet='UTF-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <title> Home</title>
      <link rel='stylesheet' href='/tailwind.css' />
      <link
        rel='stylesheet'
        href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css'
      />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');\n\n        .bg-custom{\n            background-color: #EFF0F1;\n        }\n        .btn-log{\n            background-color: #0095ff;\n            box-shadow: inset 0 2px 0 0 rgba(255 , 255 , 255 , 0.4);\n        }\n        .btn-sign{\n            box-shadow: inset 0 1px 0 0 rgba(255 ,255 ,255 ,0.7);\n            background-color: #e1ecf4;\n            border-color: #7aa7c7; \n            color: #39739d;\n        }\n        .border-custom-1{\n            border-color: #F48024;\n        }\n    ",
        }}
      />
    </div>
  );
};

export default Head;
