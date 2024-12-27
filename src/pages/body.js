import React, { useEffect, useState,useContext } from 'react';
import { Typography, IconButton, Popover, Dialog, DialogTitle, DialogContent,Box } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { MyContext } from './MyContext';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
const paragraphText = `This is the first sentence. Here is another sentence? And finally the last sentence! This is the first sentence. Here is another sentence? And finally the last sentence! This is the first sentence. Here is another sentence? And finally the last sentence! This is the first sentence. Here is another sentence? And finally the last sentence!`;

const InteractiveParagraph = () => {
  const [expandedSentence, setExpandedSentence] = useState(null);
  const [wordDetails, setWordDetails] = useState({ word: '', open: false });
  const [anchorEl, setAnchorEl] = useState(null);
  const[chapterSentences,setChapterSentences]= useState([]);
  const [expandedIndexes, setExpandedIndexes] = useState({});
 

  const{
    selectedChapter
  } = useContext(MyContext);

  const toggleExpand = (index) => {
    setExpandedIndexes(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const handleExpandClick = (index) => {
    setExpandedSentence(expandedSentence === index ? null : index);
  };

  const handleWordClick = (event, word) => {
    setAnchorEl(event.currentTarget);
    setWordDetails({ word, open: true });
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setWordDetails({ ...wordDetails, open: false });
  };
  useEffect(()=>{
    console.log("every reder");
  })

  useEffect(()=>{

    console.log("calledcssd",selectedChapter);
    const fetchChapter= async()=>{
      try{
        
        const sentencesResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/user/getBook?chapterId=${selectedChapter.chapter_id}`,
          {
            method:"GET",
            headers:{
              "Content-type":"application/json",
            },
          }
        );

        if(!sentencesResponse.ok)
        {
          throw new Error("Api request failed");
        }
        const data = await sentencesResponse.json();
              console.log("sentences",data.data);
             // setDropdownData(data.data)
             setChapterSentences(data.data);

      }
      catch(err){
        console.log("Standarrrrrd fetch api failed",err)
      }
    
    }
    if(selectedChapter && selectedChapter.chapter_id)
    {
      console.log("called",selectedChapter);
      fetchChapter();
    }
    

  },[selectedChapter])

  useEffect(()=>{
if(chapterSentences){
  console.log("csent",chapterSentences)
}
  },[chapterSentences])
  const sentences = paragraphText.match(/[^\.!\?]+[\.!\?]+/g);

  return (

    <>
    <Box>
      
{chapterSentences&&(
   <Typography variant="body1" 
   //sx={{ display: 'flex', alignItems: 'center' }} 
   >

{chapterSentences.map((sentence,index) =>(

<>
  <span key={index}>
    
      {sentence.value} 
      <IconButton
      onClick={() =>toggleExpand(index)}
      size='large'
      aria-label="expand"
      color='info'
      sx={{ fontSize: 'inherit', padding: 0, marginLeft: 0 }}
      >
      <ExpandMoreOutlinedIcon fontSize="inherit"/>
      </IconButton>

  </span>
  {
    expandedIndexes[index] &&(
      <Typography variant="body2" color="text.secondary"  >
              Additional information about this sentence.
            </Typography>
    )
  }
  </>
))}
</Typography>
)
}
      
    </Box>
    <div>
      <Typography variant="body1" gutterBottom>
        {sentences.map((sentence, index) => (
          <span key={index}>
            {sentence.split(' ').map((word, wordIndex) => (
              <span
                key={wordIndex}
                style={{ cursor: 'pointer' }}
                onDoubleClick={(event) => handleWordClick(event, word)}
              >
                {word}{' '}
              </span>
            ))}
            <IconButton onClick={() => handleExpandClick(index)}>
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>

            {/* Expanded paragraph section */}
            {expandedSentence === index && (
              <Typography variant="body2" color="textSecondary">
                Additional information about this sentence is shown here.
              </Typography>
            )}
          </span>
        ))}
      </Typography>

      {/* Word Detail Popover */}
      <Popover
        open={wordDetails.open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>Details about: {wordDetails.word}</Typography>
      </Popover>
    </div>
    </>
  );
};

export default InteractiveParagraph;
