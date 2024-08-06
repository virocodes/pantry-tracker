'use client'
import { Box, Stack, Typography, Button, Modal, TextField } from "@mui/material";
import { firestore } from "@/firebase";
import { collection, query, getDocs, getDoc, setDoc, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Home() {
  const [pantry, setPantry] = useState([])
  const [itemName, setItemName] = useState('')
  
  const updatePantry = async () => {
    const querySnapshot = await getDocs(collection(firestore, "pantry"));
    let pantryList = []
    querySnapshot.forEach((doc) => {
      pantryList.push({name: doc.id, ...doc.data()})
    });
    setPantry(pantryList)
  }

  const addItem = async (item) => {
    const docRef = doc(firestore, "pantry", item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await setDoc(doc(firestore, 'pantry', item), {quantity: docSnap.data().quantity + 1})
    } else {
      await setDoc(doc(firestore, 'pantry', item), {quantity: 1})
    }
    setItemName('')
    updatePantry()
  }

  const deleteItem = async (item) => {
    console.log(item)
    const docRef = doc(firestore, 'pantry', item)
    await deleteDoc(docRef)
    updatePantry()
  }

  const incrementItem = async (item, mul) => {
    const docRef = doc(firestore, "pantry", item);
    const docSnap = await getDoc(docRef);

    await setDoc(doc(firestore, 'pantry', item), {quantity: docSnap.data().quantity + (1*mul)})
    updatePantry()
  }

  useEffect(() => {
    updatePantry()
  }, [])

  return (
      <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={2}>

        <Typography variant="h1">Pantry Tracker</Typography>

        <Box 
        width={'50%'}
        display={'flex'}
        flexDirection={'column'}
        gap={2}>

          <Box
          display={'flex'}
          alignItems={'center'}
          gap={2}
          height={'56px'}>

            <TextField variant="outlined" label="Add Item" fullWidth value={itemName}
            onChange={(e)=>{
              setItemName(e.target.value)
            }}></TextField>

            <Button variant="contained" sx={{ height: '56px' }}
            onClick={() => {
              addItem(itemName)
            }}>Add</Button>

          </Box>

          <Stack 
          border={'2px solid black'}
          height={'50vh'}
          overflow={'auto'}
          display={'flex'}
          flexDirection={'column'}
          gap={1}
          padding={1}>

            {pantry.map((item) => (
              <Box
              width={'100%'}
              display={'flex'}
              justifyContent={'space-between'}
              key={item.name}>

                <Typography variant="h3">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Typography>

                <Box display={'flex'} gap={2}>

                  <Button size="large" variant="outlined"
                  onClick={() => {
                    incrementItem(item.name, -1)
                  }}>-</Button>

                  <Typography variant="h3">{item.quantity}</Typography>

                  <Button size="large" variant="outlined"
                  onClick={() => {
                    incrementItem(item.name, 1)
                  }}>+</Button>

                  <Button color="error" size="small"
                  onClick={() => {
                    deleteItem(item.name)
                  }}><i class="material-icons">&#xe872;</i></Button>

                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
        
      </Box>
  )
  
}
