import Container from '@material-ui/core/Container';
import Article from './Article';
import React from 'react';
import Button from '@material-ui/core/Button';

export default ({articles, currentPage, lastPage, onGoToPage}) => (
  <Container maxWidth="xs">
    {articles.map(article => (
      <Article key={article.slug} {...article} />
    ))}
    <div className="articles-pagination">
      {[...Array(lastPage).keys()].map(i => (
        <Button
          key={i}
          color={i === currentPage ? 'primary' : 'default'}
          style={{margin: '5px'}}
          variant="contained"
          onClick={() => onGoToPage(i)}>
          {i}
        </Button>
      ))}
    </div>
  </Container>
);
