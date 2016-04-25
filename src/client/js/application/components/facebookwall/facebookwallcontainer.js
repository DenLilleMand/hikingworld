import { connect } from 'react-redux';
import genericActionCreators from '../../actioncreators/genericactioncreators';
import FacebookWall from './facebookwall';
import { POST } from '../../constants/typeconstants';

const mapStateToProps = (state) => {
    return {
        posts: state.posts.map.toArray()
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getPosts: (user, type) => {dispatch(genericActionCreators.asyncGetAll(user, type))},
        createPost: (post, user, type) => {dispatch(genericActionCreators.asyncCreate(post, user, type))},
        updatePost: (post, user, type) => {dispatch(genericActionCreators.asyncUpdate(post, user, type))},
        deletePost: (id, user, type) => {dispatch(genericActionCreators.asyncDelete(id, user, type))}
    }
};

const FacebookWallContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FacebookWall);

export default FacebookWallContainer;




