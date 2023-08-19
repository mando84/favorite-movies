function SearchBox(props) {
  return (
    <div className="col">
      <input
        className="form-control"
        placeholder="Type to search movie"
        value={props.value}
        onChange={(e) => props.setSearchValue(e.target.value)}
      ></input>
    </div>
  );
}
export default SearchBox;
