import { FormEvent, useState } from 'react'
import './styles.css'

import api from '../../config/configApi'
import { useNavigate } from 'react-router-dom'

type StatusType = {
  type: string
  message: string
}

function Home() {
  const [image, setImage] = useState<File>()
  const [status, setStatus] = useState<StatusType>()
  const navegate = useNavigate()

  const uploadImage = async (e: FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    if (image) {
      formData.append('image', image)

      const heardes = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      await api
        .post('/upload-image', formData, heardes)
        .then(res => {
          setStatus({
            type: 'success',
            message: res.data.message
          })
          setTimeout(() => {
            navegate('/list-image')
          }, 3000)
        })
        .catch(err => {
          if (err.res) {
            setStatus({
              type: 'error',
              message: err.res.data.message
            })
          } else {
            setStatus({
              type: 'error',
              message: 'Error:Server offline, tente mais tarde.'
            })
          }
        })
    }
  }

  return (
    <div className="container">
      <div className="container-image">
        <h1>Upload-Image</h1>
        <button
          onClick={e => {
            navegate('/list-image')
          }}
        >
          Listar Imagens
        </button>
        {status?.type === 'success' && (
          <p className="message-success">{status.message}</p>
        )}
        {status?.type === 'error' && (
          <p className="message-error">{status.message}</p>
        )}
        <form onSubmit={uploadImage} className="form">
          <div className="upload-image">
            <label>Carregar Image: </label>
            <input
              type="file"
              name="image"
              onChange={e => {
                const data = e.target.files
                if (data) {
                  setImage(data[0])
                }
              }}
            />
          </div>

          <div className="show-image">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Image"
                width="300"
                height="300"
              />
            ) : (
              <img
                src="/usuario-default.png"
                alt="Image"
                width="300"
                height="300"
              />
            )}
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  )
}

export default Home
