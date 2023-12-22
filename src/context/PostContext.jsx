import { createContext, useEffect, useReducer, useState } from "react";

const PostsContext = createContext();

const PostsActionTypes = {
  get_all: 'get all posts from data',
  add: 'add one new post',
  delete: 'delete one specific post',
  edit: 'edit one specific post',
};

const reducer = (state, action) => {
  switch(action.type){
    case PostsActionTypes.get_all:
      return action.data;
    case PostsActionTypes.add:
      fetch(`http://localhost:8081/posts`, {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(action.data)
      });
      return [...state, action.data];
    case PostsActionTypes.delete:
      fetch(`http://localhost:8081/posts/${action.id}`,{
        method: "DELETE"
      });
      return state.filter(el => el.id.toString() !== action.id.toString());
    case PostsActionTypes.edit:
      return state.map(el => {
        if(el.id.toString() === action.id.toString()){
          fetch(`http://localhost:8081/posts/${action.id}`, {
            method: "PUT",
            headers:{
              "Content-Type":"application/json"
            },
            body: JSON.stringify({ registerDate:el.registerDate, ...action.data})
          });
          return { id:action.id, registerDate:el.registerDate, ...action.data };
        } else {
          return el;
        }
      });
    default:
      console.log("Error: action type not found", action.type);
      return state;
  }
}

const PostsProvider = ({ children }) => {

  const [posts, setPosts] = useReducer(reducer, []);

  useEffect(() => {
    fetch(`http://localhost:8081/posts`)
      .then(res => res.json())
      .then(data => setPosts({
        type: PostsActionTypes.get_all,
        data: data
      }));
  }, []);

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        PostsActionTypes
      }}
    >
      { children }
    </PostsContext.Provider>
  );
}

export { PostsProvider };
export default PostsContext;