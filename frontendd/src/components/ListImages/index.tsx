import { useEffect, useState } from 'react'
import './styles.css'
import api from '../../config/configApi'
import { useNavigate } from 'react-router-dom'

type DataImage = {
  id: number
  image: string
  createAt: string
  updatedAt: string
}

type StatusType = {
  type: string
  message: string
}

function ListImages() {
  const [dataImage, setDataImage] = useState<DataImage[]>()
  const [dataUrl, setDataUrl] = useState('')
  const navigate = useNavigate()
  const [status, setStatus] = useState<StatusType>()
  const [reload, setReload] = useState('')

  const getImage = async () => {
    await api
      .get('/list-image')
      .then(res => {
        setDataImage(res.data.images)
        setDataUrl(res.data.url)
        setTimeout(() => {
          setReload('reload')
          setStatus({
            type: 'success',
            message: 'Imagens carregadas com sucesso.'
          })
        }, 3000)
      })
      .catch(err => {
        setStatus(err.res)
        setTimeout(() => {
          setReload('reload')
          setStatus({
            type: '',
            message: ''
          })
        }, 3000)
      })
  }

  async function DeleteImage(id: number) {
    await api
      .get(`/delete-image/${id}`)
      .then(res => {
        setStatus({
          type: 'success',
          message: res.data.message
        })
        setTimeout(() => {
          setReload('reload')
          setStatus({
            type: '',
            message: ''
          })
        }, 3000)
      })
      .catch(err => {
        if (err.res) {
          setStatus({
            type: 'error',
            message: err.res.data.message
          })
          setTimeout(() => {
            setReload('reload')
            setStatus({
              type: '',
              message: ''
            })
          }, 3000)
        } else {
          setStatus({
            type: 'error',
            message: 'Error:Server offline, tente mais tarde.'
          })
          setTimeout(() => {
            setReload('reload')
            setStatus({
              type: '',
              message: ''
            })
          }, 3000)
        }
      })
  }

  useEffect(() => {
    getImage()
  }, [reload])

  return (
    <div className="list-container">
      <div className="list-cabecalho">
        <h1>List Images</h1>
        <button
          onClick={e => {
            navigate('/')
          }}
        >
          Upload Image
        </button>
      </div>
      {status?.type === 'success' && (
        <p className="message-success">{status.message}</p>
      )}
      {status?.type === 'error' && (
        <p className="message-error">{status.message}</p>
      )}
      <div className="list-images" style={{ margin: '1rem' }}>
        {dataImage &&
          dataImage.map(image => (
            <div key={image.id} className="show-image">
              <span>{image.id}</span>
              <div className="info-image">
                <p> Name :</p>
                <span>{image.image}</span>
                <div>
                  <button
                    onClick={e => {
                      DeleteImage(image.id)
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="image">
                <p> Image:</p>
                <img
                  src={dataUrl + image.image}
                  alt={image.image}
                  width="200"
                  height="200"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ListImages
