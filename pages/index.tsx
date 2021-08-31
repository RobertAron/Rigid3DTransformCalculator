import { ChangeEvent, useCallback, useState } from 'react'
import { Box, Button, Container, Grid, TextField } from '@material-ui/core'
import type { NextPage } from 'next'
import { Layout } from '../src/components/layout'
import { Canvas } from '@react-three/fiber'

const label = ['x','y','z']

const Home: NextPage = () => {
  const [matrix, setMatrix] = useState([["0", "0", "0"], ["1", "1", "1"], ["2", "2", "2"]])
  const update = useCallback((i: number, j: number) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMatrix((current) => {
      return ([
        ...current.slice(0, i),
        [
          ...current[i].slice(0, j),
          event.target.value,
          ...current[i].slice(j + 1),
        ],
        ...current.slice(i + 1)
      ])
    })
  }, []);
  const addPosition = useCallback(()=>setMatrix((current)=>[...current,["0","0","0"]]),[])
  return (
    <Layout>
      <Container>
        <Grid container>
          <Grid container item spacing={1} lg={6} xs={12}>
            {
              matrix.map((row, rowIndex) => (
                row.map((number, numberIndex) => (
                  <Grid item xs={4} key={numberIndex}>
                    <TextField label={label[numberIndex]} value={number} type="number" fullWidth onChange={update(rowIndex,numberIndex)} />
                  </Grid>
                ))
              ))
            }
            <Grid item xs={12}>
              <Button variant='outlined' fullWidth onClick={addPosition}>ADD</Button>
            </Grid>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Canvas>
              <ambientLight/>
              <pointLight position={[10,10,10]}/>
              {
                matrix.map((row,index)=>(
                  <mesh key={index} position={row.map((value)=>parseFloat(value))}>
                    <boxGeometry args={[1,1,1]}/>
                    <meshStandardMaterial color='blue'/>
                  </mesh>
                ))
              }
            </Canvas>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default Home
