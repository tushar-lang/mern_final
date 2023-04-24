function BookCard(props) {

  return(
    <div className="card-container">
      <img
        src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
        alt="Books"
        height="200"
      />
      <div className="desc">
        <h2>{props.book.title}</h2>
        <h3>{props.book.author}</h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ flex: 1 }}>{props.book.description}</p>
          <button onClick={() => props.removeBook(props.book._id)}>X</button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
