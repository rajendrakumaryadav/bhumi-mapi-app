import { useNavigate, useLocation } from 'react-router-dom'

/**
 * A link that navigates to `to` and then scrolls to the element with id `hash`.
 *
 * Why we need this on GitHub Pages:
 *   <Link to="/#features">  →  /land-area-calculator/#features
 *   If the user is already on the target route we just smooth-scroll.
 *   If they're on a different route (e.g. /privacy) we navigate first
 *   and then scroll once the new page has rendered.
 */
export default function HashLink({
  to = '/',
  hash,
  children,
  className,
  onClick,
  ...rest
}) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = (e) => {
    e.preventDefault()
    onClick?.(e)

    const scroll = () => {
      const el = document.getElementById(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // Keep the URL in sync so refresh / share works.
        window.history.replaceState(null, '', `#${hash}`)
      }
    }

    if (location.pathname === to) {
      scroll()
    } else {
      navigate(to)
      // Wait for the new route to mount before measuring the anchor.
      setTimeout(scroll, 60)
    }
  }

  return (
    <a
      href={to === '/' ? `#${hash}` : `${to}#${hash}`}
      onClick={handleClick}
      className={className}
      {...rest}
    >
      {children}
    </a>
  )
}
