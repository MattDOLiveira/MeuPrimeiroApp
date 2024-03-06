import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import StyledButton from '../components/StyledButton';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

interface ListItem {
  id: string;
  text: string;
  imageUrl: string;
}

const data = [
  { id: '1', text: 'Banana', imageUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWEhUVFRUVGBgSEhIYEhESFREREhISGBQZGRgUGBgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QGhISHjQrIys1NDQ1NDQ0NDQxNDQ0NDExNDQ0NDQ0NDQxNDQ0NDQ0NDQ0MTQ2NDQ0NDQ0NDQ0NDQ0NP/AABEIANQA7gMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAECBQAGB//EADgQAAIBAwIEAwUHBAIDAQAAAAECAAMEESExBRJBUWFxgQYTIpGhMkJSYrHB0RRy4fAj8VOCkhX/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAoEQACAgICAgEDBAMAAAAAAAAAAQIRAyESMQRBUSJhkRMyccEFQqH/2gAMAwEAAhEDEQA/APnFTlzpKu+BKLtEru46CIQO5rcxxNDg/DyzAkRKwti7Ce64VZBQNIdIB3h1qFA0m0gCrmLWyfITrioTt6TGci4xtgbmtk4kIZUUDCJTM527OqKpDFExxGiaHEuKkKGOB5xeLCpJDQAaDiW5oqGlw0QB+aTmA553PAAxaRzQDVJQ1YqAOzmULmD95I54DJaqYP35liYCq4UZJiZSDC4k/wBRF6bhhlSCJJWSVQb38laoi/LKkGIQ570TveiIsplCpjoDQNVZIcTN5TLgmOhHzC6rY0EUo0yxlCST5z0fA+G7Eiemkec2aHBeHcoBxPTW9LpBWtDAE0SAi+JkSYJA6j40EPbUs6mL2tMuc9JrJSnLOVs68caQJaQhBbgwvu5ZFmZoLtaiBazmmBO5IchUZRtTIWiZsKglxREOQGNyES6oZqtQE7+nAhYGWUMGVM1jREXejDkFGY4MoVmm1ARdqMOQUJMJUEx40IP+nisdAA+NyBk4Ge8X4gVPwjVup6RHi6GpzIp5QmoPdpn8N4yFPJV0YfeOxmU7l+19dnPmyN/TEaFOpTPMnqh2ImhZcRWoMfZYbod4ytWm6jDLn0nnbnlS9pheqnmx9IY5824v0gw5ZKkz0vPJ5xKcsjllHaELiV5hBlZHLCgC8wnBhA4kgSiT5twewLMCRPcWNqFA0ivCrEKo0m9bUMmelJ1o8sJb08DmOwi1Ry74EZu3z8C9Je0t+XU7mc85HRij7Y3bUgoEaEAjwgac50hxLYgQ8sHiYF5OZAnARDLiXBlJIjEEzOZoPMrmAggnGUDy+YACZIu6RhpQiSULcso4jaoTtBXiYWY5cqitdmeTJxX3PPcSI1O08/StVqhmZc5JAPhNW9PvKi0wdCfj8pp/0aouFGgnPGUoR5e2cLTS5fJ4R7B1qEIzD1Okbs7KotRXJJwwyTqZq29EtXdvurhfWb6Wo5c46TeXkyTS+xSk4tWFCaec73UOlMco8hCKom9noifuZ3uo7yicEELAR91LC3jZpCV5ICMu2obR24YU08TD0qYVSx6bTKqMalTwBndOVI4oR5MYsaWTzGafJF6QwMQ4acrlZ2KNIgJLYlQZBaTYUSwkqDOWWjCjgxnBzJnQAsKkuKsEBOKwGG97OFSA5ZPLEAfnEj3kDywtC1Zz2HeTKSirbF12WQknA1jaWv4vlGKFFUGBv3ku083N5UpajpfJjLJekDalgaTC43V5UZj6TZq1sb7CYtxYtcvjOEU6nv4CcuOf1bMJKzz3s7as9RnI9Z6C+ULTY9hN+14eiIEQAADpMj2gpYpkDc/pOmWayZJurPNcHp81Nz1NSeio0PhxPO+yqsWdPzZ+s97b8P8Ahl5muar4LlHk1XweeWnjTtONMzWu7AjUeomeXwcGdWHIpR0dcJWgHIZHI0YDiSDNSxbDTvijM7EYjP4hX5iEXYQ9rbhR4zGtWbJc7maaXnebybbM4RUUOlJBgVuxCiqp6zNmlkyAZHMJYERDs5ZYkyyy3LGAJSZfmlwkjlgBUtK88uySvu4AR7yXV5CUCTgazWtLEJqdW/SYZc8ca338EykogrW06v8AKO8uB4SzQNR55WXNKbt/g55ScitR8Rdqkh2gEpmo3KNh9o9pzOVk9EpTaq2NlG57+E26FAKvKBoJNtbBQAOkK5xN4Q4q2JIC2F2mJdnnLHoAcR6/r/dG5/SZt23JTY+BmU5W6RSV9inshZYaq/dyB5Ce2pDSef8AZuliipO7ZY+pm+k6VK5NlRVIXuUnnuJW2mRuPrPT1Zj3o3hCbjK0UluzzWTO94YSpT1MGaZnrxakkzWyffGWFwYJkMgUzKCxalL5hVp4nFBNWTQI4kr5yxpSPdGIZHMe8ulRpApGEVIgoslUw63EWCyCsfYDv9TLLWESUS4HQa+EKQWOrWEatrZn2GneW4fwbOGqeifzNnIGFUeQE87P5iX0Q2xOQKnQCDT1PWXJlqmCMfM+PhFnOJ52ST5Pk7Zm1eyzvFXaSz94r8TtyJ6noB3nM22xEqhduVfU9hNq1tQi4Hz6kybK1CLgep6kxoidGLH7YijHEUuawAJMNVeY9xV528BKyT9ISVglPMeYzL47UJCoN2YDHhmazDAmNaD314Pw0tT59JljX1fxs0qkersafKir2AH0mgg0gKSxllwJtiWmwBOZjXTZJmrWbAMwa9T4seMK2WuhGodYPMYcfF6TuWetgX0IaAAydIfkEjkE2AQLSBJyJIYTRgdiSFlAYRRENFhJCyQIVViGD5ZVkjAUk4AyT0E0rThROr6flG/rM8uaGJXJibMu2sWc4UeZOwm/Y8OSmM/ab8R/aNJSAGAMAdBCZnkZ/Mlk0tInstyaZY8o8d4uX1IUYHUncznf/TF6tSc8syUagq+/sVfJZ3i1SpKVq2IvQpPWPw5CZ+J+/gO8wVvolkKGqPyp/wCzdFE3rKzVFwPU9SZe0tVRQqjA+pPcxradOPHW2SQdBAO8tUeZN5dfdX1Mqc1FaCrKXtzzHlXbqYFEkIkms4Vcmc7l7fZcYmfxm8CITnpDeyVkVp87D4qh5j5dBPO5N1dLTH2UPM56YB0E+i21AAAAaATZxcIqPt7f9C7YegkJVOksqYEDVnSouMaBbYlfPhTMYtHOJ1PiC/OI12wIRjssQr3AD6yBeL3mRf1gah12i6Y7z08caihnoxXB6y4qCedDnvCiq3eXQGybYShtYdXhVIlAJi1Ikige00VAh6dPJwBrE5UrYWZXIR0jtrw131Pwr3O58hNejaqNTgn6CNCedn87/XH+QF7a0VNhr1Y7xkSrPBPVnmyk27k7YBXeBepAvVgXqTGUgCO8SubkAb+neVaoznlQFj1bXlXzM1LHhQQ8z/G/4jsv9o/eEYNiZn2XDGqENUyqdE2Zv7uwnoKVIKAAAANgNoRVnM06YxSRNEkwLvK1awA1mRdXhbRdv1inkS0hUXvrkMOUeGT5RREkokIdJg5VtlpHHQZnlPabi/KCq6k6ADck7CaHHOKhEOvSY/shwprmt/U1Qfdo3/Ep+8/4vITpwY0k8uTpf9YpfCPTex3CDRpBmHx1PibuM7LPYUVi9tTjRlYuU5PJL2DVaId4rcVAASekM7zE4jc8x5QdBv5zolJsEhN35mJPUxG9rYB8IxWOJ5/jVzhCBu2n8y8UbkkNfJkseZmbuZdVi9IRhVM9HoZIBhRBc2sMHEdgeiRvCFVhFUeUvq5WjUZSAyo7AlecAqudsjO3eUBqU9TpHqFUbKfNjuZ8s9mvaB610xdyC6ABC2E+H8Ixp18Z7qxvAMnOcaaDQaTz/wDILImlejNStnp1IkvUmclfO/8AEitdBes8lv4NENPUiz1Z1Km77DA/EdvTvNC34ao1PxHx2+UhQlLobaRnKrtoqk+PT1MZo8KJ+22fyJkL6nc/SaqUwITImsMHtktgqNBVACqABsBgCG2g2cRetdKu5mj4wAZd4lc3ir59ohccRLaLp49YnjO8xllcugoNWrs5127SqJLokvkCYtpDSIAxMni3EginWdxXiiop1nk7S0q31blXIQH436KP58J0eP4/P656igk6O4dYPf18aiih/wCRu/5R4mfWbCyVEVFUBVACqNgBA8H4UlCmtNFwqj1J6se5mntOmT/Ua9RXS/v+SeiAMSlR8CDuK4UEnpPPV+Iu5IHz8JXrQJD19e/dXfqe0zC2JAMWuauIRXsdAbutPH3t7z1DjZdB/Mf9oOI8i8i/af6LMG0M78EKXJjZoUDH1cRCmI2AMToYkHAEtyiDRQfOcVgM10edcHmRlGPiRhrtqCJRagMKEHeaUI+RBilRlYFSgYDfIcaZ09Z6Ph/GKwKsj4QYyrqDzHA5vHfPWel4l7M0a78x+BjuyY+L+4dZlVvZmsmeUq4AJGDhiO2D19Y8slKNUZKDTNdPaN3woXUkAYGpPhPX8H4acB62rnUJnKp4HuZ8+9lON2qvytlamo56miqc45R+Ez6Hb8TQDPOmO/MMTxvI8dwf7TRST6N5BCaTIPF0H3s+USuuMFhhTjxGMzDnFaGk2b9SsBuZmXnEl5SA2D3XceMxKlyzEFmOO04CS5Se0FALa0IcVDUqOwzg1HJ3GNhpsdo+zE7wamWBmWWbk7eyki6iGVYDnxF7i+Cjec+5PRSiaL1QBMHi3GlQHB9Zk8U4591dT2H7x/gHsi9ZhVucqm60tmbz/CPr5TsxeKornk/Am66MzhfCq18+dUpA/E56+A7mfTuF8LShTVKa4A+bH8THqYza2qIoRFCqowFUYAHhCs2J0Sly70vSMzicRa4uQoyTBXV4FHj2mHXrM5yTp2mbd6Q0jri5dzvp2G0hVAEnQCLVnlRQdk16mJi8SvQilj02Hc9oW8ugASTgDczyV/dF2z0H2R+86cUOTv0UtA6lTncs25P+iPW1ITPpvg7TQtnBOs7loTNClagwq2og0I6ExlMjrFYATakbGUNFo0AdessSfCOwApSYbGGSsw0M5ap7SlRSZuSOJXPaXetncGLUiBpnMKX02ioD5jxu19xXqDLHmbmR86FWOcER72etCxDscjOQuu+d56rjPBluFGDyuv2WxkEdjMC3pvbHkdSNdG3VvIxZ5S/TaXZk407PUU6pwNI3SqzHtuJqRrHEul7ieE8bT2jeLNRKkJ7yZi1x3ljcdzJkUaXvZzXAEw7rjFNB8Ta/hX4iflPMXftczvy0l5QdAzYLeg2H1lYvCyZdpaE5xiet4jxpUBycfh/N5CYFOpcXLhEDa5wq7kdyeggOEcLevUAyWZvtM2SFHcntPrPAODpb0wqjLNjnc/aY/wAeE3448Goq5CcmzO9mvZFKGHcB6m+TqqH8udz4n6T1agCDeoBp8/CZfEOIuBhMA9WOoHkOp85i3buTtips1Klzj/cTMueJbhd5ltWcjVie5O/nJRQJO5MdJFmy2pkO4AlXq4iVxVlRjQuw1StM+6usZ19e0Fc3QAOuABkk6ADuZ5LinFi55VPwdSdC/wDidGPE5srotxXiBdsL9gH/AOj38pnGrK80kMDO1RUVSEXp1td5rWdWZ9GmPCOUUH/UYG3QcY1EOKizNRDj7R8pbUDcR0Js0VPjCquenymcjnG3yjttnGzCFAVNXwlwc9IJIYMP+p0USXppjpGA2Og8oFH+neFV8woZYOewEHVw2VIVgdwwyITmlefy+UpJCZiXHB6ZJK8yHsCWX5GB/wDySBn3g07r/mbbtrK1TofKS8MZbaJtnib7iTIxUDODuScZ8plVeMVCfi1H5fhI9Zr8Zo6n9Z5+unjJjign0Ntja3tMjfB65BiNC2apWC0xzFnypGg1Ode2IEUckAZJJwANye0+oexHs17lRUfHO4zg7KO0nNljgg2u30hVy7PVeyvCFt6Izq7DLt1J7Tar3SoNWAODgZ1Mx7zioQAJyls4JOwHh4zKqXjO2SZ4Mpt77ZsomzWvi2QIvjqdYolQCc9zpJjFvbG/sNs8Ve4iz3MWqXE2j9hUNVK2JnXl8qqWZuVR17nsB1Mz+J8WSmMMeZsaUwdfNj0E8pdXdSo3MzD8qjRVHYD952YvHcty6E5V0PcR4k1U41VAdF6t4t/ERCQfOewMur9MH9Z18aVIDiphqSmSif7rGUB8JLYUShjNDeBRh1EcooI0gY2j47wiOD28sQSL0zjzh6dM/XprKJGbdR236COUxp9oj0zFaS9cY89IUOOufQxDRFPyhkA6iURT0x844Mgbb9NDOmiSqgeEIEHlKe88vkZcuT+ExpCOdRKMQP8Af5lyoPQ+hzKMPP1EpIAQTMq1PT0+cPyjv+wg6g/3TEZJ5fjFMZIH8ieYrU9Z63i3WeZut9phN7LSM8VWRlZd1YdAdM+M9xwb2metT5cgEEg7Dy+k8U6zuHt7tyeYqDvgZ6/9zPNijlg0+ydpn0FXJOph1qYmDacYogYLY75znMOeL0P/ACL9Z5LwTuqf4NlJGwbiVa5mBW49RXYs3gqn9TiZ1z7RsdEUL+Zvib5bD6zaHizfr8g5o9Rc3SopZ2CgdSfoO881xDj7NlaIKr1qN9tv7R93z38pj1CztzMzMe7HPy7Sy0vEztx4IQ29sltsgUtcljk7k6knzliPzSCnj85ZaflNWxURynoRHLCkWb4sYA6QaUO/6TX4bbYXONzM5S0VFBVtx0P7zhan8p9NfpDlR2+UuijuQfGZllKVn3HyjK2HY+h/xGLZDNGkD2yO+kabRNGctof7h3Ghl1oMDkA+nSa6KO0ZRFO2ngAJVsOJjpWP3seeIUOOmDNVqa6ZH6Qb2iH/ABpCwowabnSNpUM6dOwyHaWu8YNMY2kTo0BXkGJDLpOnS10BxQaRS5G/nOnSWB5LjDEE4JnnK9Q53nTphLsfoCWMrmTOghFllXnToewBQiCdOlMEGSFzOnTJlI5IyiCdOkSKQws1rb7C+U6dMygiuYzTUEagTp0YGjb2y+O3eM09JM6JAOrvCKoPQTp0oQOtKLVONh8pM6Az/9k=' },
  { id: '2', text: 'Maça', imageUrl: 'https://acdn.mitiendanube.com/stores/746/397/products/maca-argentina1-a86acef532d11addf315221676880019-640-0.jpg' },
  { id: '3', text: 'Kiwi', imageUrl: 'https://media.istockphoto.com/id/525151431/pt/foto/kiwi-castanho-da-ilha-do-norte-apteryx-mantelli.jpg?s=612x612&w=0&k=20&c=60ihZmlAo3eeqOn5li0Qnx5zzhmK9KBKY5O_YaQW34c=' },
];



const styles = StyleSheet.create({
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
});

export default Home;
