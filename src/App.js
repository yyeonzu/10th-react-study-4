/* eslint-disable */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
	// 받아온 데이터 저장하는 state
	const [posts, setPosts] = useState([]);
	const [singlePost, setSinglePost] = useState({});
	const [comments, setComments] = useState([]);

	// input에 입력된 게시글과 댓글
	const [newPost, setNewPost] = useState('');
	const [newComment, setNewComment] = useState('');

	// 상세 조회하고자 하는 게시글의 id
	const id = 44;

	// 새로고침 될 때 마다 실행됩니다.
	useEffect(() => {
		getPosts();
		getSinglePost();
	}, []);

	// 전체 게시글 조회 함수
	const getPosts = async () => {
		const response = await axios
			.get('https://dy6578.pythonanywhere.com/api/posts/')
			.then(response => {
				// ?? (전체 게시글 저장)
				setPosts(response.data);
			})
			.catch(error => {
				console.log('전체 글 불러오기 실패', error.message);
			});
	};

	// 특정 게시글 조회
	const getSinglePost = async () => {
		const response = await axios
			.get(`https://dy6578.pythonanywhere.com/api/posts/${id}`)
			.then(response => {
				// ?? (특정 게시글 저장)
				// ?? (댓글 저장)
				setSinglePost(response.data);
				setComments(response.data.comment);
			})
			.catch(error => {
				console.log('글 하나 불러오기 실패');
			});
	};

	// 새로운 게시글 작성 함수
	const PostSubmit = e => {
		e.preventDefault();

		// 아래 코드 중 .post("??", {})에서 { }도 채워주세요 !!
		axios
			.post('https://dy6578.pythonanywhere.com/api/posts/', {
				title: '제 목',
				author: 1,
				content: newPost,
			})
			.then(response => {
				// ?? (게시글 불러오기)
				getPosts();
			})
			.catch(error => {
				console.log('작성 실패');
			});

		// ???? (input 비우기)
		setNewPost('');
	};

	// 새로운 댓글 작성 함수
	const CommentSubmit = e => {
		e.preventDefault();

		// 아래 코드 중 .post("????", { })에서 { }도 채워주세요 !!
		axios
			.post('https://dy6578.pythonanywhere.com/api/comments/', {
				post: id,
				author: 1,
				content: newComment,
			})
			.then(response => {
				// ?? (게시글 불러오기)
				// ?? (특정 게시글 불러오기)
				getPosts();
				getSinglePost();
			})
			.catch(function (error) {
				console.log('댓글 작성 실패', error);
			});

		// ??? (input 비우기)
		setNewComment('');
	};

	// 게시글 삭제 함수
	const onDelete = id => {
		axios
			.delete(`https://dy6578.pythonanywhere.com/api/posts/${id}`)
			.then(response => {
				// ???? (전체 게시글 불러오기)
				getPosts(response.data);
			})
			.catch(error => {
				console.log('삭제 실패', error);
			});
	};

	return (
		<div>
			<form onSubmit={PostSubmit}>
				<input
					placeholder="새 게시글 작성하기 "
					value={newPost}
					onChange={e => setNewPost(e.target.value)}
				/>
				<button>작성</button>
			</form>

			{posts.map(post => {
				return (
					<p style={{ border: '1px solid red' }}>
						{post.content}
						<button onClick={() => onDelete(post.id)}>삭제</button>
					</p>
				);
			})}

			<div style={{ border: '1px solid blue' }}>
				<h1>{singlePost.content}</h1>
				{comments.map(comment => {
					return <p>ㄴ {comment.content}</p>;
				})}

				<form onSubmit={CommentSubmit}>
					<input
						placeholder="댓글 작성하기"
						value={newComment}
						onChange={e => setNewComment(e.target.value)}
					/>
					<button>작성</button>
				</form>
			</div>
		</div>
	);
}

export default App;
