import React, { FC } from 'react';

import vk from './../pics/icons/vk.svg';
import linkedIn from './../pics/icons/linkedIn.svg';
import instagram from './../pics/icons/instagram.svg';
import github from './../pics/icons/gitHub.svg';

const Footer: FC = () => {
	return (
		<footer className="footer">
			<div className="footer__wrapper">
				<ul className="social">
					<li className='social__item'>
						<a href="https://vk.com/we_are_helvetios" target='_blank' rel='noreferrer'>
							<img src={vk} alt="" />
						</a>
					</li>
					<li className='social__item'>
						<a href="!#" target='_blank' rel='noreferrer'>
							<img src={linkedIn} alt="" />
						</a>
					</li>
					<li className='social__item'>
						<a href="https://www.instagram.com/anna_helvetii" target='_blank' rel='noreferrer'>
							<img src={instagram} alt="" />
						</a>
					</li>
					<li className='social__item'>
						<a href="https://github.com/AnnaHelvetii" target='_blank' rel='noreferrer'>
							<img src={github} alt="" />
						</a>
					</li>
				</ul>
				<div className="footer__copyright">
					<span>© 2024 </span>
					<a href="https://soboleva-anna.ru/">soboleva-anna.ru</a>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
