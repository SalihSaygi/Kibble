 import React from 'react';
import { useMutation } from 'react-query'
import { updateApiToken } from '../../../api/userApi'
 
 const mutation = useMutation("apiToken", updateApiToken) 

export default mutation