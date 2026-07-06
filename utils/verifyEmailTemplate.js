const verifyEmailTemplate = ({name,url})=>{
return`
<p>Dear ${name}</p>
<p>Thank you for registering eBazer.</p>
<a href=${url} style="color: #181715ff;background : #e3a70eff; margin-top : 10px,padding: 20px, display: block">
    Verify Email
</a>
`
}

export default verifyEmailTemplate