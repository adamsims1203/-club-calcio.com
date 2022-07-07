export default {
  name: "content",
  title: "Content",
  type: "array",
  of: [
    {
      type: "block",
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
          {
            title: "Highlight",
            value: "highlight",
            blockEditor: {
              icon: () => "H",
            },
          },
        ],
      },
    },
  ],
};
