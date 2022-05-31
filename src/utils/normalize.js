const normalize = books =>
  books.map(
    ({
      authors,
      id,
      imageLinks: { thumbnail },
      pageCount,
      title,
      subtitle,
      shelf,
    }) => ({
      authors,
      id,
      thumbnail,
      pageCount,
      title,
      subtitle,
      shelf,
    })
  );

export default normalize;
